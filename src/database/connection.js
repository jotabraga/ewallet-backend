import "../setup.js";
import pg from "pg";

const { Pool } = pg;
const config = {
    connectionString: process.env.NODE_ENV === 'test' ? process.env.DATABASE_TEST_URL : process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
};
const connection = new Pool(config);

export default connection;