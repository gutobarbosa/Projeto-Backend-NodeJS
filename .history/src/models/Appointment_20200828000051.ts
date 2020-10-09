import { uuid } from 'uuidv4';
import { Entity, Column, PrimaryGeneratedColumn, Timestamp } from 'typeorm';

@Entity('appointments')
interface AppointmentConstructor {
    provider: string;
    date: Date;
}

class Appointment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    provider: string;

    @Column('Timestamp with time zone')
    date: Date;

    constructor({ provider, date }: Omit<Appointment, 'id'>) {
        this.id = uuid();
        this.provider = provider;
        this.date = date;
    }
}

export default Appointment;
