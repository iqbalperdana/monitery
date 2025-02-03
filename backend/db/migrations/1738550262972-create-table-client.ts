import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableClient1738550262972 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
              CREATE TABLE "client" (
                  "id" BIGSERIAL PRIMARY KEY,
                  "first_name" VARCHAR(255) NOT NULL,
                  "last_name" VARCHAR(255) NOT NULL,
                  "email" VARCHAR(255),
                  "phone" VARCHAR(255),
                  "company_id" BIGINT NOT NULL,
                  "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                  "updated_at" TIMESTAMP NOT NULL DEFAULT now()
              )  
          `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "client"`);
  }
}
