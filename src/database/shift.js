import mongoose from 'mongoose';

const Shift = mongoose.model('Shift');

const createShift = payload => new Promise((resolve) => {
  const newShift = new Shift(payload);
  newShift.save((err, shift) => {
    resolve({ error: err ? err.message : null, response: shift });
  });
});

const findShift = query => new Promise((resolve) => {
  Shift.findOne(query, (err, shifts) => {
    resolve({ error: err, response: shifts });
  });
});

const findShifts = (query = {}) => new Promise((resolve) => {
  Shift.find(query, (err, shifts) => {
    resolve({ error: err, response: shifts });
  });
});

export {
  createShift,
  findShift,
  findShifts,
};
