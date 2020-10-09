import { Router } from 'express';
import { startOfHour, parseISO, isEqual } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

// POST http://localhost:3333/appointments
appointmentsRouter.get('/', (request, response) => {
    const appointments = appointmentsRepository.all();
    return response.json(appointments);
});
appointmentsRouter.post('/', (request, response) => {
    const { provider, date } = request.body;
    const parsedDate = startOfHour(parseISO(date));
    const findAppointmentInSameDate = appointmentsRepository.findByDate(
        parsedDate,
    );
    if (findAppointmentInSameDate) {
        // se findAppointmenteInSameDate for verdadeira executa isso
        return response
            .status(400)
            .json({ message: 'this apppointment is already booked' });
    }
    const appointment = appointmentsRepository.create({
        provider,
        date: parsedDate,
    });
    return response.json(appointment);
});

export default appointmentsRouter;
