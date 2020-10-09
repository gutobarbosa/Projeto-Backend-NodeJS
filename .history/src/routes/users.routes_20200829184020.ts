import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();
// POST http://localhost:3333/appointments

appointmentsRouter.post('/', async (request, response) => {
    try {

    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
});

export default appointmentsRouter;
