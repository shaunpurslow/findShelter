// load .env data into process.env
import dotenv from 'dotenv';
dotenv.config();

// Web server config
const PORT = process.env.PORT || 8080;
// const ENV = process.env.ENV || 'development';
import express from 'express';
const app = express();
import morgan from 'morgan';
import session from 'cookie-session';

// PG database client/connection setup
import { Pool } from 'pg';
import dbParams from './lib/dbparams';
const db = new Pool(dbParams);
db.connect();

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

// import routes
import shelterRoutes from './routes/shelter';

// mount routes
app.use('/shelters', shelterRoutes(db));

// start server
app.listen(PORT, () => {
  console.log(`Find Shelter Server listening on port ${PORT}`);
});
