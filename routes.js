import { Router } from 'express';
import response from './response.js';
import chatsRoute from './routes/chatsRoute.js';
import groupsRoute from './routes/groupsRoute.js';
import sessionsRoute from './routes/sessionsRoute.js';

const router = Router();

// Middleware para registrar todas las solicitudes que pasan por el router
router.use((req, res, next) => {
    console.log(`Received request: ${req.method} ${req.originalUrl}`);
    console.log('Headers:', req.headers);
    console.log('Body:', req.body);
    next();
});

// Rutas
router.use('/sessions', sessionsRoute);
router.use('/chats', chatsRoute);
router.use('/groups', groupsRoute);

// Ruta para manejar cualquier solicitud que no coincida con las anteriores
router.all('*', (req, res) => {
    console.log(`Unhandled request: ${req.method} ${req.originalUrl}`);
    response(res, 404, false, 'The requested url cannot be found.');
});

export default router;
