import mongoose from 'mongoose';

const Account = mongoose.model('Account');

const getAccounts = (req, res) => {
  Account.find({}, (err, account) => {
    if (err) res.send(err);
    res.json({ response: account });
  }).populate('user');
};

const createAccount = (req, res) => {
  const newAccount = new Account(req.body);
  newAccount.save((err, account) => {
    if (err) res.send(err);
    res.json(account);
  });
};

export {
  getAccounts,
  createAccount,
};
