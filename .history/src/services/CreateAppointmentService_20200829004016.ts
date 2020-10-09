import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
/**
 *  [x]recebimento das informações
 *  [X]tratativa de erro e exceções
 *  [X]Acesso ao repositorio
 */

interface Request {
    date: Date;
    provider: string;
}

/**
 * Dependency inversion(SOLID) aprendemos o D e o S do SOLID até agora...
 */

class CreateAppointmentService {
    public async execute({ date, provider }: Request): Promise<Appointment> {
        const appointmentsRepository = getCustomRepository(
            AppointmentsRepository,
        );
        const appointmentDate = startOfHour(date); // regra de negocio

        const findAppointmentInSameDate = appointmentsRepository.findByDate(
            appointmentDate,
        );
        if (findAppointmentInSameDate) {
            throw Error('this apppointment is already booked');
        }
        const appointment = appointmentsRepository.create({
            provider,
            date: appointmentDate,
        });

        await appointmentsRepository.save(appointment);
        return appointment;
    }
}

export default CreateAppointmentService;
