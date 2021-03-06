import database from '../utils/database';
import Shift from '../models/shift';
import { errorResponse, paginateResponse, createResponse } from '../utils/response';

const shiftDB = database.collection('shifts');

// Returns all shifts paginated in descending order
const findShifts = () => new Promise((resolve) => {
  shiftDB.orderBy('actual.start.date', 'desc').get()
    .then(shift => paginateResponse(resolve, shift))
    .catch(error => errorResponse(resolve, error));
});

// Creates a new shift
const createShift = shiftPayload => new Promise((resolve) => {
  shiftDB.add(Shift(shiftPayload))
    .then(shift => createResponse(resolve, shift))
    .catch(error => errorResponse(resolve, error));
});

// Edits a shift
const editShift = shiftPayload => new Promise((resolve) => {
  const shiftRef = shiftDB.doc(shiftPayload.id);
  shiftRef.set(Shift(shiftPayload), { merge: true })
    .then(() => createResponse(resolve, shiftRef))
    .catch(error => errorResponse(resolve, error));
});

export {
  createShift,
  editShift,
  findShifts,
};
