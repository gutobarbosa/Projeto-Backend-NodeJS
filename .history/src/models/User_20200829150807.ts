import { Entity, Column, PrimaryGeneratedColumn, Timestamp } from 'typeorm';

interface AppointmentConstructor {
    provider: string;
    date: Date;
}

@Entity('users') // nome da tabela
class User {// nome do arquivo
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column('timestamp with time zone')
    date: Date;
}
export default User;
