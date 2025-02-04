import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableInvoice1738550749695 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
                      CREATE TABLE "invoice" (
                          "id" BIGSERIAL PRIMARY KEY,
                          "invoice_number" VARCHAR(255) NOT NULL,
                          "invoice_date" TIMESTAMP NOT NULL,
                          "due_date" TIMESTAMP NOT NULL,
                          "total" DECIMAL(10, 2) NOT NULL,
                          "status" VARCHAR(255) NOT NULL,
                          "notes" TEXT,
                          "public_url" VARCHAR(255),
                          "client_id" BIGINT NOT NULL,                          
                          "company_id" BIGINT NOT NULL,
                          "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                          "updated_at" TIMESTAMP NOT NULL DEFAULT now()
                      )  
                  `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "invoice"`);
  }
}
