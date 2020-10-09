import { Entity, Column, PrimaryGeneratedColumn, Timestamp } from 'typeorm';

interface AppointmentConstructor {
    provider: string;
    date: Date;
}

@Entity('appointments')
class Appointment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    provider: string;

    @Column('timestamp with time zone')
    date: Date;
}

export default Appointment;
