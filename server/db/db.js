const pg = require('pg');


const conString = process.env.DB_URL
const client = new pg.Client(conString);
client.connect((err) => {
  if (err) {
    return console.error('could not connect to postgres', err);
  }

  console.log('connecting to elephantSQL')
});