const pg = require('pg');


const conString = process.env.DB_URL
const client = new pg.Client(conString);
client.connect((err) => {
  if (err) {
    return console.error('could not connect to postgres', err);
  }

  console.log('connecting to elephantSQL')
  // client.query('SELECT * FROM guests', (err, result) => {
  //   if (err) {
  //     return console.error('error running query', err);
  //   }
  //   console.log(result);
  //   // >> output: 2018-08-23T14:02:57.117Z
  //   client.end();
  // });
});