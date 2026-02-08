const { Client } = require("pg");
require('dotenv').config();

async function main() {
const client = new Client({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

       
    await client.connect();
    await client.query("select * from animes;");
    await client.end();
}

main();