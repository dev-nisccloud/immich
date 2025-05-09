import { Kysely, sql } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  await sql`CREATE OR REPLACE FUNCTION album_user_after_insert()
  RETURNS TRIGGER
  LANGUAGE PLPGSQL
  AS $$
    BEGIN
      UPDATE albums SET "updatedAt" = "updatedAt"
      WHERE "id" IN (SELECT DISTINCT "albumsId" FROM inserted_rows);
      RETURN NULL;
    END
  $$;`.execute(db);

  await sql`CREATE OR REPLACE TRIGGER "album_user_after_insert"
  AFTER INSERT ON "albums_shared_users_users"
  REFERENCING NEW TABLE AS "inserted_rows"
  FOR EACH STATEMENT
  EXECUTE FUNCTION album_user_after_insert();`.execute(db);
}

export async function down(db: Kysely<any>): Promise<void> {
  await sql`CREATE EXTENSION IF NOT EXISTS "vectors";`.execute(db);
  await sql`DROP TRIGGER "album_user_after_insert" ON "albums_shared_users_users";`.execute(db);
  await sql`DROP FUNCTION album_user_after_insert;`.execute(db);
}
