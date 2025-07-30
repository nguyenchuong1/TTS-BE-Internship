import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateUsersAddRefreshTokenDefaultDefaultNull1751971050928
  implements MigrationInterface
{
  name = 'UpdateUsersAddRefreshTokenDefaultDefaultNull1751971050928';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "refresh_token" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "refresh_token" DROP DEFAULT`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "refresh_token" SET DEFAULT ''`);
    await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "refresh_token" SET NOT NULL`);
  }
}
