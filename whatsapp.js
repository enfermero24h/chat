import {
    Browsers,
    DisconnectReason,
    delay,
    makeInMemoryStore,
    useMultiFileAuthState
} from '@adiwajshing/baileys';
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import pino from 'pino';
import { toDataURL } from 'qrcode';
import dirname from './dirname.js';
import response from './response.js';

// Mapas para gestionar sesiones y reintentos de conexión
const sessions = new Map();
const retries = new Map();

// Directorio de sesiones
const sessionsDir = (subdir = '') => {
    return path.join(dirname, 'sessions', subdir ? subdir : '');
};

// Verifica si una sesión ya existe
const isSessionExists = (sessionId) => {
    return sessions.has(sessionId);
};

// Determina si se debe reconectar basado en el número de reintentos
const shouldReconnect = (sessionId) => {
    const maxRetries = parseInt(process.env.WA_SERVER_MAX_RETRIES ?? 0) || 1;
    let retryCount = retries.get(sessionId) ?? 0;

    if (retryCount < maxRetries) {
        retryCount++;
        console.log('Reconnecting...', { attempts: retryCount, sessionId });
        retries.set(sessionId, retryCount);
        return true;
    }
    return false;
};

// Crea una nueva sesión
const createSession = async (sessionId, isLegacy = false, res = null) => {
    const sessionPrefix = isLegacy ? 'legacy_' : 'md_';
    const sessionFileName = `${sessionPrefix}${sessionId}`;
    const logger = pino({ level: 'info' });
    const store = makeInMemoryStore({ logger });

    let state, saveCreds;

    if (isLegacy) {
        // Configuración específica para sesiones legacy
    } else {
        ({ state, saveCreds } = await useMultiFileAuthState(sessionsDir(sessionFileName)));
    }

    const connectionOptions = {
        auth: state,
        version: [2, 1541, 1],
        printQRInTerminal: false,
        logger: logger,
        browser: Browsers.chrome('Chrome'),
        patchMessageBeforeSending: (message) => {
            if (message.buttonsMessage || message.listMessage) {
                message = {
                    viewOnceMessage: {
                        message: {
                            messageContextInfo: {
                                deviceListMetadataVersion: 2,
                                deviceListMetadata: {}
                            },
                            ...message
                        }
                    }
                };
            }
            return message;
        }
    };

    const connection = await makeInMemoryStore(connectionOptions);

    if (!isLegacy) {
        store.readFromFile(sessionsDir(`${sessionId}_store.json`));
        store.bind(connection.ev);
    }

    sessions.set(sessionId, { ...connection, store, isLegacy });

    // Manejo de eventos de conexión
    connection.ev.on('creds.update', saveCreds);
    connection.ev.on('chats.set', ({ chats }) => {
        if (isLegacy) store.chats.insertIfAbsent(...chats);
    });

    // Evento para manejar actualizaciones de mensajes
    connection.ev.on('messages.upsert', async (message) => {
        try {
            const msg = message.messages[0];
            if (!msg.key.fromMe && message.type === 'notify') {
                const dataToSend = {
                    remoteJid: msg.key.remoteJid,
                    sessionId,
                    messageId: msg.key.id,
                    message: msg.message
                };
                sentWebHook(sessionId, dataToSend);
            }
        } catch (error) {
            console.error('Error handling message upsert:', error);
        }
    });

    // Manejo de la actualización de conexión
    connection.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect } = update;
        const statusCode = lastDisconnect?.error?.output?.statusCode;

        if (connection === 'open') {
            retries.delete(sessionId);
        } else if (connection === 'close') {
            if (statusCode === DisconnectReason.loggedOut || !shouldReconnect(sessionId)) {
                if (res && !res.headersSent) {
                    response(res, 500, false, 'Unable to create session.');
                }
                deleteSession(sessionId, isLegacy);
                return;
            }
            setTimeout(() => {
                createSession(sessionId, isLegacy, res);
            }, statusCode === DisconnectReason.restartRequired ? 0 : parseInt(process.env.WA_SERVER_RECONNECT_INTERVAL ?? 0));
        }

        if (update.qr) {
            if (res && !res.headersSent) {
                try {
                    const qrCode = await toDataURL(update.qr);
                    response(res, 200, true, 'QR code received, please scan the QR code.', { qr: qrCode });
                    return;
                } catch {
                    response(res, 500, false, 'Unable to create QR code.');
                }
            }

            try {
                await connection.logout();
            } catch {}
            finally {
                deleteSession(sessionId, isLegacy);
            }
        }
    });
};

// Función para establecer el estado del dispositivo
const setDeviceStatus = (sessionId, status) => {
    const url = `${process.env.CLIENT_SERVER_URL}/api/set-device-status/${sessionId}/${status}`;
    axios.post(url).catch(error => {
        console.error('Error setting device status:', error);
    });
};

// Función para enviar el WebHook
const sentWebHook = (sessionId, data) => {
    const url = `${process.env.CLIENT_SERVER_URL}/api/send-webhook/${sessionId}`;
    try {
        axios.post(url, {
            from: data.remoteJid,
            message_id: data.messageId,
            message: data.message
        }).then((response) => {
            if (response.status === 200) {
                const session = getSession(sessionId);
                sendMessage(session, response.data.receiver, response.data.message, 0);
            }
        }).catch(error => {
            console.error('Error sending webhook:', error);
        });
    } catch (error) {
        console.error('Error in sentWebHook function:', error);
    }
};

// Elimina la sesión
const deleteSession = (sessionId, isLegacy = false) => {
    const sessionPrefix = isLegacy ? 'legacy_' : 'md_';
    const sessionFileName = `${sessionPrefix}${sessionId}`;
    const storeFileName = `${sessionId}_store.json`;

    const deleteOptions = { force: true, recursive: true };
    fs.rmSync(sessionsDir(sessionFileName), deleteOptions);
    fs.rmSync(sessionsDir(storeFileName), deleteOptions);

    sessions.delete(sessionId);
    retries.delete(sessionId);

    setDeviceStatus(sessionId, 0);
};

// Obtener lista de chats
const getChatList = (sessionId, isLegacy = false) => {
    const suffix = isLegacy ? '@g.us' : '@s.whatsapp.net';
    return getSession(sessionId).store.chats.filter(chat => chat.id.endsWith(suffix));
};

// Verifica si el contacto o grupo existe
const isExists = async (session, jid, isGroup = false) => {
    try {
        let exists;
        if (isGroup) {
            exists = await session.groupMetadata(jid);
        } else {
            exists = await session.onWhatsApp(jid);
        }
        return Boolean(exists.id);
    } catch (error) {
        return false;
    }
};

// Enviar mensaje
const sendMessage = async (session, receiver, message, delayTime = 1000) => {
    try {
        await delay(delayTime);
        return await session.sendMessage(receiver, message);
    } catch (error) {
        return Promise.reject(null);
    }
};

// Formatear número de teléfono
const formatPhone = (phone) => {
    if (phone.endsWith('@s.whatsapp.net')) return phone;
    let formattedPhone = phone.replace(/\D/g, '');
    return `${formattedPhone}@s.whatsapp.net`;
};

// Formatear ID de grupo
const formatGroup = (group) => {
    if (group.endsWith('@g.us')) return group;
    let formattedGroup = group.replace(/[^\d-]/g, '');
    return `${formattedGroup}@g.us`;
};

// Limpieza al cerrar la aplicación
const cleanup = () => {
    console.log('Running cleanup before exit.');
    sessions.forEach((session, sessionId) => {
        if (!session.isLegacy) {
            session.store.writeToFile(sessionsDir(`${sessionId}_store.json`));
        }
    });
};

// Inicializar sesiones existentes al iniciar
const init = () => {
    fs.readdir(sessionsDir(), (err, files) => {
        if (err) throw err;
        for (const file of files) {
            if (!file.endsWith('.json') && !file.endsWith('_store.json') || file.includes('session_id')) continue;
            const sessionId = file.replace('_store.json', '').replace('md_', '').replace('legacy_', '');
            const isLegacy = file.startsWith('legacy_');
            createSession(sessionId, isLegacy);
        }
    });
};

export {
    cleanup, createSession, deleteSession, formatGroup, formatPhone, getChatList, getSession, init, isExists, isSessionExists, sendMessage
};

