/* eslint-disable no-console */

import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { getDataBaseURI } from './utils/database';

// Import models
import './models/account';
import './models/user';

import apiRoutes from './routes';

const app = express();
const port = process.env.PORT || 80;

// Connect to MongoDB through Mongoose
mongoose.Promise = global.Promise;
mongoose.connect(getDataBaseURI(), { useMongoClient: true });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Log requests to the console
app.use(morgan('dev'));

// Register API routes
app.use('/api', apiRoutes);

app.listen(port, (err) => {
  const logMessage = err || `PunchIn API server listening on port ${port}`;
  console.log(logMessage);
});
