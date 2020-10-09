import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    Timestamp,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

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

    @CreateDateColumn()
    // eslint-disable-next-line camelcase
    created_at: Date;

    @UpdateDateColumn()
    // eslint-disable-next-line camelcase
    updated_at: Date;
}

export default Appointment;
