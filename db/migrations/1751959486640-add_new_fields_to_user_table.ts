import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddNewFieldsToUserTable1751959486640 implements MigrationInterface {
  name = 'AddNewFieldsToUserTable1751959486640';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "users"
      ADD "refresh_token" character varying NOT NULL DEFAULT ''
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "users"
      DROP COLUMN "refresh_token"
    `);
  }
}
