import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    Timestamp,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import User from './User';
/**
 * Relacionamentos no banco de dados
 * Um para Um(OneToONe) ou seja o usuario sempre tem um agendamento, apenas um por usuario
 * Um para muitos (OneToAny) ou seja o usuario pode ter diversos agendamentos
 * Muitos para muitos(ManyToMany) ou seja  muitos usuarios participam dos mesmos serviços, é mais ou menos como se os prestadores de serviço pudessem participar do mesmo serviço.
 */

interface AppointmentConstructor {
    provider: string;
    date: Date;
}

@Entity('appointments')
class Appointment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    // eslint-disable-next-line camelcase
    provider_id: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'provider_id' }) // aqui estamos falando qual é a coluna que ira identificar qual que é o usuário prestador desse atendimento em especifico, então quando temos relacionamentos é sempre importante nos criarmos isso aqui.
    provider: User;

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
