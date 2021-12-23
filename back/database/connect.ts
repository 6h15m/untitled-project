import { PostgreSQL } from "fxsql";
import CONFIG from "../../untitled.config.json";

const { CONNECT } = PostgreSQL;
const POOL = CONNECT({
  host: CONFIG.DATABASE_INFO.HOST,
  user: CONFIG.DATABASE_INFO.USER,
  password: CONFIG.DATABASE_INFO.PASSWORD,
  database: "postgres",
});

export default POOL;
