import mysql from 'mysql2';
import fs from 'fs'
import { configDotenv } from 'dotenv';
configDotenv();

console.log("database connection ...")


const poolOptions = {
  host: "gateway01.eu-central-1.prod.aws.tidbcloud.com",
  user: "2ATCPAmibzb9x8g.root",
  port: 4000,
  database: "gloculture",
  password: "t6yMhpe2BvqaAbeZ",
  waitForConnections: true,
  ssl: {
    ca: fs.readFileSync(new URL('./isrgrootx1.pem', import.meta.url)),
    rejectUnauthorized: false
  }
};

// Create pool with correct typings
const pool = mysql.createPool(poolOptions).promise();

// const pool = mysql.createPool({
//   host: process.env.HOST,
//   user: process.env.USER,
//   password: process.env.PASSWORD,
//   database: process.env.DATABASE,
//   queueLimit: 0,
//   connectionLimit: 100,
//   waitForConnections: true,
//   multipleStatements: true
// }).promise();

export default pool;
