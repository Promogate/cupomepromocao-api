import { Client } from "pg";
import migrationScript from "./MigrationScript";

const client = new Client({
  user: "cep",
  host: "localhost",
  database: "cep",
  password: "cep",
  port: 5433
});

async function migrations() {
  try {
    await client.connect();
    console.log("Connected to database!");
    await client.query(migrationScript);
    console.log("Migration completed");
  } catch (error: any) {
    console.error("Migration failed: ", error);
  } finally {
    await client.end();
    console.log("Disconnected from database");
  }
}

export {
  client,
  migrations
};