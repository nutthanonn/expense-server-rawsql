import { Client } from "pg";
import dotenv from "dotenv";

dotenv.config();

export const client = new Client({
  port: 5432 || process.env.DB_PORT,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
