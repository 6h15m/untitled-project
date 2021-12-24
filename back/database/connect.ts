import { PostgreSQL } from "fxsql";
import dotenv from "dotenv";

dotenv.config();

const { CONNECT } = PostgreSQL;
const POOL = CONNECT({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "postgres",
});

export default POOL;
