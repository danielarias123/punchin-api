import 'babel-polyfill';
import express from 'express';
import * as functions from 'firebase-functions';
import user from './routes/user';
import auth from './routes/auth';

const app = express();

/* Unprotected Routes */
app.use('/authenticate', auth);

/* Protected Routes */
app.use('/users', user);

exports.api = functions.https.onRequest(app);
