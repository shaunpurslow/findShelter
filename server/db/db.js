const pg = require('pg');
require('dotenv').config();

const conString = process.env.DB_URL;
const client = new pg.Client(conString);
console.log(conString);
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