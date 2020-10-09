import { Router } from 'express';

const sessionsRouter = Router();
// POST http://localhost:3333/appointments

sessionsRouter.post('/', async (request, response) => {
    try {
        return response.json({ ok: true });
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
});

export default sessionsRouter;
