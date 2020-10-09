import {
    MigrationInterface,
    QueryRunner,
    TableColumn,
    TableForeignKey,
} from 'typeorm';

export default class AlterProviderFieldToProviderID1598725862848
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('appointments', 'provider');
        await queryRunner.addColumn(
            'appointments',
            new TableColumn({
                name: 'provider_id',
                type: 'uuid',
                isNullable: true,
            }),
        ); // CASCADE, o motivo pelo qual o id recebe isNullable é pra quando o prestador de servico um dia sair da plataforma o usuario que recebeu esse serviço continue tendo o log e historico dos serviços pestados
       // precisaremos criar um foreignKey para conseguir fazer essa comunicação entre as tabelas, no caso esse relacionamento.
        await queryRunner.createForeignKey(
            'appointments',
            new TableForeignKey({
                columnNames: ['provider_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {}
}
