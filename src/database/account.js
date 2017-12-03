import database from '../utils/database';
import Account from '../models/account';
import { errorResponse, documentResponse, createResponse } from '../utils/response';

const accountDB = database.collection('accounts');

// Returns an account that matches a query
const findAccount = (field, value) => new Promise((resolve) => {
  accountDB.where(field, '==', value).get()
    .then(account => documentResponse(resolve, account))
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
  findAccount,
};
