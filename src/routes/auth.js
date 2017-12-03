import { Router } from 'express';
import * as AuthController from '../controllers/auth';

const app = new Router();

app.route('/authenticate').post(AuthController.authenticate);

app.route('/signup').post(AuthController.signup);

export default app;
