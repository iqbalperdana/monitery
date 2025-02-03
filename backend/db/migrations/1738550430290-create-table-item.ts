import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableItem1738550430290 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
                  CREATE TABLE "item" (
                      "id" BIGSERIAL PRIMARY KEY,
                      "name" VARCHAR(255) NOT NULL,
                      "description" VARCHAR(255),
                      "price" DECIMAL(10, 2) NOT NULL,
                      "image_url" VARCHAR(255),
                      "is_active" BOOLEAN DEFAULT true,
                      "company_id" BIGINT NOT NULL,
                      "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                      "updated_at" TIMESTAMP NOT NULL DEFAULT now()
                  )  
              `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "item"`);
  }
}
