import database from '../database';

const findAccounts = (req, res) => {
  database.findAccounts().then(({ error, response: accounts }) => {
    res.status(error ? 400 : 200).json({ error, response: accounts });
  });
};

const createAccount = (req, res) => {
  database.createAccount(req.body).then(({ error, response: account }) => {
    res.status(error ? 400 : 200).json({ error, response: account });
  });
};

export {
  findAccounts,
  createAccount,
};
