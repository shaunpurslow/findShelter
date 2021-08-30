// load .env data into process.env
import dotenv from 'dotenv';
dotenv.config();

// Web server config
const PORT = process.env.PORT || 8080;
// const ENV = process.env.ENV || 'development';
import express from 'express';
const app = express();
import morgan from 'morgan';
import cookieSession from 'cookie-session';

// cors
import cors from 'cors';

// PG database client/connection setup
import { Pool } from 'pg';
import dbParams from './lib/dbparams';
const db = new Pool(dbParams);
db.connect();

// Middleware
app.use(morgan('dev'));
app.use(cors());

app.use(
  cookieSession({
    name: 'session',
    keys: ['key1'],
    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Import routes
import accessRoutes from './routes/access';
import registerRoutes from './routes/register';
import shelterRoutes from './routes/shelter';
import reservationRoutes from './routes/reservations';

// Mount routes
app.use('/login', accessRoutes(db));
app.use('/register', registerRoutes(db));
app.use('/shelters', shelterRoutes(db));
app.use('/reservations', reservationRoutes(db));

// Start server
app.listen(PORT, () => {
  console.log(`Find Shelter Server listening on port ${PORT}`);
});
