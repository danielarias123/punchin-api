import { Router } from 'express';
import * as ShiftController from '../controllers/shift';

const app = new Router();

app.route('/')
  .get(ShiftController.findShifts)
  .post(ShiftController.createShift);

export default app;
