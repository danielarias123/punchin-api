
import database from '../database';
import { apiResponse } from '../utils/response';

// Returns all shifts
const findShifts = async (req, res) => {
  const shiftsResponse = await database.findShifts();
  apiResponse(res, shiftsResponse);
};

// Creates a shift
const createShift = async (req, res) => {
  const { account } = req.body;
  const shiftPayload = {
    account,
  };
  const shiftResponse = await database.createShift(shiftPayload);
  apiResponse(res, shiftResponse);
};

export {
  createShift,
  findShifts,
};
