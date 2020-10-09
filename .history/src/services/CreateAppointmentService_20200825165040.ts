import Appointment from '../models/Appointment';
import appointmentsRepository from '../repositories/AppointmentsRepository';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
/**
 *  [x]recebimento das informações
 *  [/]tratativa de erro e exceções
 *  []Acesso ao repositorio
 */

interface Request {
    date: Date;
    provider: string;
}

/**
 * Dependency inversion(SOLID) aprendemos o D e o S do SOLID até agora...
 */

class CreateAppointmentService {
    private appointmentsRepository: AppointmentsRepository;

    constructor( appointmentsRepository : AppointmentsRepository) {
        this.appointmentsRepository = appointmentsRepository;
    }

    public execute({ date, provider }: Request): Appointment {
        const appointmentDate = startOfHour(parsedDate); // regra de negocio

        const findAppointmentInSameDate = this.appointmentsRepository.findByDate(
            parsedDate,
        );
        if (findAppointmentInSameDate) {
            throw Error('this apppointment is already booked')
        }
        const appointment = appointmentsRepository.create({
            provider,
            date: parsedDate,
        });
        return appointment;
    }
}
