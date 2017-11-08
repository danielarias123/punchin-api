import { Router } from 'express';
import * as UserController from '../controllers/user';

const app = new Router();

app.route('/')
  .get(UserController.getUsers)
  .post(UserController.createUser);

export default app;
