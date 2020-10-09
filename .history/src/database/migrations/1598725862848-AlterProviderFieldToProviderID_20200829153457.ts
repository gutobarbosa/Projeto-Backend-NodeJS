import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AlterProviderFieldToProviderID1598725862848
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('appointments', 'provider');
        await queryRunner.addColumn('appointments', 'provider_id');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {}
}
