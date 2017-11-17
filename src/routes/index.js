import { Router } from 'express';
import auth from './auth';
import account from './account';
import user from './user';
import shift from './shift';
import authCheck from './middleware/auth';

const app = new Router();
// ---------------------------------------------------------
// Unprotected Routes
// ---------------------------------------------------------
app.use('/authenticate', auth);

// ---------------------------------------------------------
// Protected Routes
// ---------------------------------------------------------

// Register authentification middleware for subsequent routes
app.use(authCheck);

app.use('/users', user);
app.use('/accounts', account);
app.use('/shifts', shift);

export default app;
