import database from '../database';

const findShifts = (req, res) => {
  database.findShifts().then(({ error, response: shifts }) => {
    res.status(error ? 400 : 200).json({ error, response: shifts });
  });
};

const createShift = (req, res) => {
  database.createShift(req.body).then(({ error, response: shift }) => {
    res.status(error ? 400 : 200).json({ error, response: shift });
  });
};

export {
  findShifts,
  createShift,
};
