import { Router } from 'express';
import * as AccountController from '../controllers/account';

const app = new Router();

app.route('/')
  .get(AccountController.findAccounts)
  .post(AccountController.createAccount);

export default app;
