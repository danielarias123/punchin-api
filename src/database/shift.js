import database from '../utils/database';
import Shift from '../models/shift';
import { errorResponse, paginateResponse, createResponse } from '../utils/response';

const shiftDB = database.collection('shifts');

// Returns all shifts paginated
const findShifts = () => new Promise((resolve) => {
  shiftDB.get()
    .then(shift => paginateResponse(resolve, shift))
    .catch(error => errorResponse(resolve, error));
});

// Creates a new shift
const createShift = shiftPayload => new Promise((resolve) => {
  shiftDB.add(Shift(shiftPayload))
    .then(shift => createResponse(resolve, shift))
    .catch(error => errorResponse(resolve, error));
});

export {
  createShift,
  findShifts,
};
