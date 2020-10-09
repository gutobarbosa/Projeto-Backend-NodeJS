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

@Entity('users') // nome da tabela
class User {
    // nome do arquivo
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @CreateDateColumn()
    // eslint-disable-next-line camelcase
    created_at: Date;

    @UpdateDateColumn()
    // eslint-disable-next-line camelcase
    updated_at: Date;
}
export default User;
