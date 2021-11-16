import { PostgreSQL } from 'fxsql';

const { CONNECT } = PostgreSQL;
const POOL = CONNECT({
  host: 'localhost',
  user: 'ysl1',
  password: '1028',
  database: 'postgres',
});

export default POOL;
