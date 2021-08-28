const pg = require('pg');
require('dotenv').config();

const PORT = process.env.DB_URL;

const conString = 'postgres://fxtukrlu:a1FelEAoXPmIcsYXHag1qnrAZJekZTBP@kashin.db.elephantsql.com/fxtukrlu'
console.log(PORT)
const client = new pg.Client(conString);

async function connect(client) {
  try {
    await client.connect()
    console.log(`Client connected.`)

    const sql = `SELECT * FROM guests;`
    const { rows } = await client.query(sql)
    console.table(rows)
  }
  catch (ex) {
    console.log("Some error" + ex)
  }
  finally {
    await client.end()
  }
}

connect(client)

