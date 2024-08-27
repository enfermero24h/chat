// controllers/sessionsController.js

import fs from 'fs/promises';
import path from 'path';
import response from './../response.js';
import { createSession, deleteSession, getSession, isSessionExists } from './../whatsapp.js';

const find = async (req, res) => {
    console.log('Received request to find session');

    try {
        const { sessionId } = res.locals;

        console.log(`Checking if session exists: ${sessionId}`);
        const sessionExists = isSessionExists(sessionId);

        if (!sessionExists) {
            console.warn(`Session not found: ${sessionId}`);
            return response(res, 404, false, 'Session not found.');
        }

        console.log(`Session found: ${sessionId}`);
        return response(res, 200, true, 'Session found.');
    } catch (error) {
        console.error('Error finding session:', error);
        return response(res, 500, false, 'An error occurred while finding the session.');
    }
};

const status = async (req, res) => {
    console.log('Received request to get session status');

    const { sessionId } = res.locals;
    const sessionDir = path.resolve(`sessions/md_${sessionId}`);
    const credsPath = path.join(sessionDir, 'creds.json');

    try {
        console.log(`Checking if session directory exists: ${sessionDir}`);
        try {
            await fs.access(sessionDir);
        } catch {
            console.warn(`Session directory does not exist: ${sessionDir}`);
            return response(res, 404, false, 'Session not found.');
        }

        console.log(`Reading credentials file: ${credsPath}`);
        const rawCreds = await fs.readFile(credsPath, 'utf8');
        const creds = JSON.parse(rawCreds);

        const session = getSession(sessionId);

        if (!session) {
            console.warn(`Active session not found in memory: ${sessionId}`);
            return response(res, 404, false, 'Active session not found.');
        }

        const states = ['connecting', 'connected', 'disconnecting', 'disconnected'];
        const wsState = session.ws.readyState;
        let status = states[wsState] || 'unknown';

        if (
            status === 'connected' &&
            typeof (session.isLegacy ? session.state.legacy.user : session.user) !== 'undefined'
        ) {
            status = 'authenticated';
        }

        console.log(`Session status retrieved successfully: ${status}`);

        return response(res, 200, true, 'Session status retrieved successfully.', {
            status,
            valid_session: true,
            user_info: creds.me,
        });
    } catch (error) {
        console.error('Error retrieving session status:', error);
        return response(res, 500, false, 'An error occurred while retrieving session status.');
    }
};

const add = async (req, res) => {
    console.log('Received request to add new session');

    try {
        const { id, isLegacy } = req.body;

        if (!id || typeof isLegacy === 'undefined') {
            console.warn('Missing required fields: id and isLegacy');
            return response(res, 400, false, 'Missing required fields: id and isLegacy.');
        }

        console.log(`Checking if session already exists: ${id}`);
        if (isSessionExists(id)) {
            console.warn(`Session already exists: ${id}`);
            return response(res, 409, false, 'Session already exists, please use another id.');
        }

        console.log(`Creating new session: ${id}, isLegacy: ${isLegacy}`);
        await createSession(id, isLegacy === 'true');

        console.log(`Session created successfully: ${id}`);
        return response(res, 201, true, 'Session created successfully.');
    } catch (error) {
        console.error('Error creating session:', error);
        return response(res, 500, false, 'An error occurred while creating the session.');
    }
};

const del = async (req, res) => {
    console.log('Received request to delete session');

    try {
        const { id } = req.params;

        console.log(`Retrieving session: ${id}`);
        const session = getSession(id);

        if (!session) {
            console.warn(`Session not found: ${id}`);
            return response(res, 404, false, 'Session not found.');
        }

        console.log(`Logging out session: ${id}`);
        await session.logout();

        console.log(`Deleting session: ${id}`);
        await deleteSession(id, session.isLegacy);

        console.log(`Session deleted successfully: ${id}`);
        return response(res, 200, true, 'Session deleted successfully.');
    } catch (error) {
        console.error('Error deleting session:', error);
        return response(res, 500, false, 'An error occurred while deleting the session.');
    }
};

export { add, del, find, status };

