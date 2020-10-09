import { Router } from 'express';
import { uuid } from 'uuidv4';

const appointmentsRouter = Router();
// POST http://localhost:3333/appointments

const appointments = [];

appointmentsRouter.post('/', (request, response) => {
    const { provider, date } = request.body;
    const appointment = {
        id: uuid(),
        provider,
        date,
    };
    return response.json({ message: 'hello world' });
});

export default appointmentsRouter;
