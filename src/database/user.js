
import database from '../utils/database';
import { paginateResponse, documentResponse, errorResponse, createResponse } from '../utils/response';

const userDB = database.collection('users');

// Returns all users paginated
const findUsers = () => new Promise((resolve) => {
  userDB.get()
    .then(user => paginateResponse(resolve, user))
    .catch(error => errorResponse(resolve, error));
});

// Returns a user that matches a query
const findUser = (field, value) => new Promise((resolve) => {
  userDB.where(field, '==', value).get()
    .then(user => documentResponse(resolve, user))
    .catch(error => errorResponse(resolve, error));
});

// Creates a new user
const createUser = userPayload => new Promise((resolve) => {
  userDB.add(userPayload)
    .then(user => createResponse(resolve, user))
    .catch(error => errorResponse(resolve, error));
});

export {
  findUsers,
  findUser,
  createUser,
};
