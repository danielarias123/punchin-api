import { Router } from 'express';
import * as UserController from '../controllers/user';

const app = new Router();

app.route('/')
  .post(UserController.authenticateUser);

export default app;
