import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableInvoiceItem1738550861096 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
                      CREATE TABLE "invoice_item" (
                          "id" BIGSERIAL PRIMARY KEY,
                          "quantity" INT NOT NULL,
                          "price" DECIMAL(10, 2) NOT NULL,
                          "item_id" BIGINT NOT NULL,
                          "invoice_id" BIGINT NOT NULL,
                          "company_id" BIGINT NOT NULL,
                          "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                          "updated_at" TIMESTAMP NOT NULL DEFAULT now()
                      )  
                  `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "invoice_item"`);
  }
}
