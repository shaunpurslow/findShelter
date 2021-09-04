// load .env data into process.env
import dotenv from 'dotenv';
dotenv.config();

// Web server config
const PORT = process.env.PORT || 8080;
import express from 'express';
const app = express();

// Express and Socket server initialization instructions from socket.io docs
// https://socket.io/docs/v3/server-initialization/
import { createServer } from 'http';
const httpServer = createServer(app);
import { Server } from 'socket.io';
const io = new Server(httpServer, {
  path: '/socket/',
  cors: {
    origin: [process.env.SOCKET_ORIGIN || 'http://localhost:3000'],
  },
});

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

// Socket.IO middlerware pattern
// https://stackoverflow.com/questions/47837685/use-socket-io-in-expressjs-routes-instead-of-in-main-server-js-file
app.use(function (req, res, next) {
  req['io'] = io;
  next();
});

// Import routes
import accessRoutes from './routes/access';
import registerRoutes from './routes/register';
import shelterRoutes from './routes/shelter';
import reservationRoutes from './routes/reservations';
import guestRoutes from './routes/guests';

// Mount routes
app.use('/login', accessRoutes(db));
app.use('/register', registerRoutes(db));
app.use('/shelters', shelterRoutes(db));
app.use('/reservations', reservationRoutes(db));
app.use('/guests', guestRoutes(db));

// Socket.IO
// https://www.valentinog.com/blog/socket-react/
io.on('connection', (socket) => {
  console.log('Connected to Find Shelter API Web Socket');
});

// Start server
httpServer.listen(PORT, () => {
  console.log(`Find Shelter API listening on port ${PORT}`);
});
