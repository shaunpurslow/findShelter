// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT = process.env.PORT || 8080;
// const ENV = process.env.ENV || 'development';
const express = require('express');
const app = express();
const morgan = require('morgan');
const session = require('cookie-session');

// PG database client/connection setup
// const { Pool } = require('pg');
// const dbParams = require('./lib/dbparams.js');
// const db = new Pool(dbParams);
// db.connect();

// MIDDLE WARE
// Loading morgan logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.use(
  session({
    name: 'session',
    keys: ['key1', 'key2'],
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ROUTES

// start server
app.listen(PORT, () => {
  console.log(`Find Shelter Server listening on port ${PORT}`);
});
