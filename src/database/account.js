import database from '../utils/database';
import Account from '../models/account';
import { errorResponse, documentResponse, createResponse } from '../utils/response';

const accountDB = database.collection('accounts');
const userDB = database.collection('users');

// Returns an account for a user
const findUserAccount = userID => new Promise((resolve) => {
  const userRef = userDB.doc(userID);
  accountDB.where('user', '==', userRef).get()
    .then(account => documentResponse(resolve, account, ['user']))
    .catch(error => errorResponse(resolve, error));
});

// Creates a new account
const createAccount = accountPayload => new Promise((resolve) => {
  accountDB.add(Account(accountPayload))
    .then(account => createResponse(resolve, account))
    .catch(error => errorResponse(resolve, error));
});

export {
  createAccount,
  findUserAccount,
};
