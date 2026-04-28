import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserStatusEnumAndUsersTable1714150000000 implements MigrationInterface {
  name = 'CreateUserStatusEnumAndUsersTable1714150000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create the user_status enum type in PostgreSQL
    await queryRunner.query(`
      CREATE TYPE user_status AS ENUM ('active', 'pending_verification', 'suspended', 'deleted');
    `);

    // Create the users table
    await queryRunner.query(`
      CREATE TABLE "users" (
        "id" UUID NOT NULL DEFAULT gen_random_uuid(),
        "email" character varying NOT NULL,
        "full_name" character varying NOT NULL,
        "password" character varying NOT NULL,
        "status" user_status NOT NULL DEFAULT 'active',
        "is_admin" boolean NOT NULL DEFAULT false,
        "created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT NOW(),
        CONSTRAINT "PK_users_id" PRIMARY KEY ("id")
      );
    `);

    // Create unique index on email
    await queryRunner.query(`
      CREATE UNIQUE INDEX "IDX_users_email" ON "users" ("email");
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop the users table first (due to dependencies)
    await queryRunner.query(`DROP INDEX "IDX_users_email"`);
    await queryRunner.query(`DROP TABLE "users"`);

    // Drop the enum type
    await queryRunner.query(`DROP TYPE user_status`);
  }
}
