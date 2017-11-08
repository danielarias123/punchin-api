import { Router } from 'express';
import * as AccountController from '../controllers/account';

const app = new Router();

app.route('/')
  .get(AccountController.getAccounts)
  .post(AccountController.createAccount);

export default app;
