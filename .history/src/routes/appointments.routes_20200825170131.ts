import { Router } from 'express';
import { parseISO } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

// POST http://localhost:3333/appointments
appointmentsRouter.get('/', (request, response) => {
    const appointments = appointmentsRepository.all();
    return response.json(appointments);
});
appointmentsRouter.post('/', (request, response) => {
    const { provider, date } = request.body;
    const parsedDate = parseISO(date); // transformando data
    const createAppointment = new CreateAppointmentService(
        appointmentsRepository,
    );
    const appointment = createAppointment.execute({})
    return response.json(appointment);
});

export default appointmentsRouter;
