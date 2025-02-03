import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddIndexToUser1738549995011 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE INDEX idx_user_email ON "user"(email);
            CREATE INDEX idx_user_company_id ON "user"(company_id);
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP INDEX idx_user_email;
            DROP INDEX idx_user_company_id;
        `);
  }
}
