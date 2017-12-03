import 'babel-polyfill';
import express from 'express';
import * as functions from 'firebase-functions';
import authCheck from './routes/middleware/auth';
import auth from './routes/auth';
import user from './routes/user';
import shift from './routes/shift';

const app = express();

/* Unprotected Routes */
app.use(auth);

/* Authentification middleware for subsequent routes */
app.use(authCheck);

/* Protected Routes */
app.use('/users', user);
app.use('/shifts', shift);

exports.api = functions.https.onRequest(app);
