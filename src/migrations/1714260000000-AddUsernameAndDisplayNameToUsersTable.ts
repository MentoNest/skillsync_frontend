import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUsernameAndDisplayNameToUsersTable1714260000000 implements MigrationInterface {
  name = 'AddUsernameAndDisplayNameToUsersTable1714260000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Add username column (nullable initially for existing users)
    await queryRunner.query(`
      ALTER TABLE "users" ADD COLUMN "username" character varying(30);
    `);

    // Add display_name column
    await queryRunner.query(`
      ALTER TABLE "users" ADD COLUMN "display_name" character varying(50);
    `);

    // Add username_changed_at column to track cooldown
    await queryRunner.query(`
      ALTER TABLE "users" ADD COLUMN "username_changed_at" TIMESTAMP;
    `);

    // Create unique index on username (nulls allowed, non-null must be unique)
    await queryRunner.query(`
      CREATE UNIQUE INDEX "IDX_users_username" ON "users" ("username") WHERE "username" IS NOT NULL;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop the unique index
    await queryRunner.query(`DROP INDEX "IDX_users_username"`);

    // Drop the columns
    await queryRunner.query(`
      ALTER TABLE "users" DROP COLUMN "username";
    `);

    await queryRunner.query(`
      ALTER TABLE "users" DROP COLUMN "display_name";
    `);

    await queryRunner.query(`
      ALTER TABLE "users" DROP COLUMN "username_changed_at";
    `);
  }
}
