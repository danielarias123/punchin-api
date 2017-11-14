import mongoose from 'mongoose';

const Account = mongoose.model('Account');

const createAccount = payload => new Promise((resolve) => {
  const newAccount = new Account(payload);
  newAccount.save((err, account) => {
    resolve({ error: err ? err.message : null, response: account });
  });
});

const findAccount = query => new Promise((resolve) => {
  Account.findOne(query, (err, account) => {
    resolve({ error: err, response: account });
  }).populate('user');
});

const findAccounts = (query = {}) => new Promise((resolve) => {
  Account.find(query, (err, accounts) => {
    resolve({ error: err, response: accounts });
  }).populate('user');
});

export {
  createAccount,
  findAccount,
  findAccounts,
};
