import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableCompany1738550098958 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
          CREATE TABLE "company" (
              "id" BIGSERIAL PRIMARY KEY,
              "name" VARCHAR(255) UNIQUE NOT NULL,
              "description" VARCHAR(255),
              "email" VARCHAR(255),
              "phone" VARCHAR(255),
              "address" VARCHAR(255),
              "logo_url" VARCHAR(255),
              "website" VARCHAR(255),
              "is_active" BOOLEAN DEFAULT true,
              "created_at" TIMESTAMP NOT NULL DEFAULT now(),
              "updated_at" TIMESTAMP NOT NULL DEFAULT now()
          )  
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "company"`);
  }
}
