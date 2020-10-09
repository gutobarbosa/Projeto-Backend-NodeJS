import {MigrationInterface, QueryRunner, Table} from "typeorm";

export default class CreateAppointments1598577675043 implements MigrationInterface {
    public async up(_queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
               name: 'appointments',
               columns: [{

               }]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {}
}
