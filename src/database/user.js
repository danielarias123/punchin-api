import mongoose from 'mongoose';

const User = mongoose.model('User');

const createUser = payload => new Promise((resolve) => {
  const newUser = new User(payload);
  newUser.save((err, user) => {
    resolve({ error: err ? err.message : null, response: user });
  });
});

const findUser = query => new Promise((resolve) => {
  User.findOne(query, (err, user) => {
    const error = !user ? 'User not found' : null;
    const status = user ? 200 : 401;

    resolve({ status, error, response: user });
  });
});

const findUsers = (query = {}) => new Promise((resolve) => {
  User.find(query, (err, users) => {
    resolve({ error: err, response: users });
  });
});

export {
  createUser,
  findUser,
  findUsers,
};
