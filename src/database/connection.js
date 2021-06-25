import pg from 'pg';

const { Pool } = pg;

const connection = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: '123456',
  database: 'mywallet',
  port: 5432
  });

export default connection;