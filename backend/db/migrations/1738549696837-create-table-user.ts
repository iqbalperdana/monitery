import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableUser1738549696837 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
                CREATE TABLE "user" (
                    "id" BIGSERIAL PRIMARY KEY,
                    "email" VARCHAR UNIQUE NOT NULL,
                    "password" VARCHAR NOT NULL,
                    "first_name" VARCHAR,
                    "last_name" VARCHAR,
                    "is_verified" BOOLEAN DEFAULT false,
                    "verification_token" VARCHAR,
                    "is_active" BOOLEAN DEFAULT true,
                    "company_id" BIGINT NOT NULL DEFAULT 1,
                    "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                    "updated_at" TIMESTAMP NOT NULL DEFAULT now()
                )    
            `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
