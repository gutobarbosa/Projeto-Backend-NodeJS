import { Entity, Column, PrimaryGeneratedColumn, Timestamp } from 'typeorm';

interface AppointmentConstructor {
    provider: string;
    date: Date;
}

@Entity('appointments')
class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    provider: string;

    @Column('timestamp with time zone')
    date: Date;
}
export default User;
