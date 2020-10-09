import { startOfHour } from 'date-fns';

import AppError from '@shared/errors/AppError';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/iAppointmentsRepository';
/**
 *  [x]recebimento das informações
 *  [X]tratativa de erro e exceções
 *  [X]Acesso ao repositorio
 */

interface Request {
    date: Date;
    // eslint-disable-next-line camelcase
    provider_id: string;
}

/**
 * Dependency inversion(SOLID) aprendemos o D e o S do SOLID até agora...
 */

class CreateAppointmentService {
    // eslint-disable-next-line no-useless-constructor
    constructor(private appointmentsRepository: IAppointmentsRepository) {}

    // eslint-disable-next-line camelcase
    public async execute({ date, provider_id }: Request): Promise<Appointment> {
        const appointmentDate = startOfHour(date); // regra de negocio

        const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
            appointmentDate,
        );
        if (findAppointmentInSameDate) {
            throw new AppError('this apppointment is already booked');
        }
        const appointment = await this.appointmentsRepository.create({
            provider_id,
            date: appointmentDate,
        });
        return appointment;
    }
}

export default CreateAppointmentService;
