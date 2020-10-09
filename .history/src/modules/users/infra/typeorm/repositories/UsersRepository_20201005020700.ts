import { getRepository, Repository } from 'typeorm';
import IUsersRepository from '@modules/appointments/repositories/iAppointmentsRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import User from '../entities/User';

// Data transfer object

class UsersRepository implements IUsersRepository {
    private ormRepository: Repository<User>;

    constructor() {
        this.ormRepository = getRepository(User);
    }

    public async findByDate(date: Date): Promise<Appointment | undefined> {
        const findAppointment = await this.ormRepository.findOne({
            where: { date },
        });
        return findAppointment;
    }

    public async create({
        // eslint-disable-next-line camelcase
        provider_id,
        date,
    }: ICreateAppointmentDTO): Promise<Appointment> {
        const appointment = this.ormRepository.create({ provider_id, date });
        await this.ormRepository.save(appointment);
        return appointment;
    }
}
export default AppointmentsRepository;
