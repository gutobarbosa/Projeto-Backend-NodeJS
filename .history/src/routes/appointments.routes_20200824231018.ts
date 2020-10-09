import { Router } from 'express';
import { startOfHour, parseISO, isEqual } from 'date-fns';
import Appointment from '../models/Appointment';

const appointmentsRouter = Router();
// POST http://localhost:3333/appointments

const appointments: Appointment[] = [];

appointmentsRouter.post('/', (request, response) => {
    const { provider, date } = request.body;
    const parsedDate = startOfHour(parseISO(date));
    const findAppointmenteInSameDate = appointments.find(appointment =>
        isEqual(parsedDate, appointment.date),
    );

    if (findAppointmenteInSameDate) {
        // se findAppointmenteInSameDate for verdadeira executa isso
        return response
            .status(400)
            .json({ message: 'this apppointment is already booked' });
    }
    const appointment = new Appointment(provider, parsedDate);
    appointments.push(appointment);
    return response.json(appointment);
});

export default appointmentsRouter;
