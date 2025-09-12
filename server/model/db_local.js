import mysql from 'mysql2';
import { configDotenv } from 'dotenv';

configDotenv();

console.log("database connection ...")

const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  queueLimit: 0,
  connectionLimit: 100,
  waitForConnections: true,
  multipleStatements: true
}).promise();

export default pool;
