import jwt from 'jsonwebtoken';
import { generate, verify } from 'password-hash';
import database from '../database';
import { initializeEnvironment } from '../utils/environment';

// Load environment variables from .env file
initializeEnvironment();

const { JWT_SECRET } = process.env;

// Returns all users
const findUsers = (req, res) => {
  database.findUsers().then(({ error, response: users }) => {
    res.status(error ? 400 : 200).json({ error, response: users });
  });
};

// Creates a user
const createUser = (req, res) => {
  const { password, ...rest } = req.body;
  const userPayload = {
    password: generate(password),
    ...rest,
  };

  database.createUser(userPayload).then(({ error, response: user }) => {
    if (error) {
      res.status(400).json({ error });
    } else {
      database.createAccount({ user: user._id }).then(({ error: accountError }) => {
        if (error) res.status(400).json({ error: accountError });
        res.json(user);
      });
    }
  });
};

// Authenticates a user
const authenticateUser = (req, res) => {
  const { email, password } = req.body;
  database.findUser({ email }).then(({ error, status, response: user }) => {
    if (error) {
      res.status(status).json({ error });
    } else if (!verify(password, user.password)) {
      res.status(401).json({ error: 'Invalid Credentials' });
    } else {
      const payload = { admin: user.admin };
      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });
      // Find the user's account
      database.findAccount({ user: user._id }).then((accountResponse) => {
        const { error: accountError, response: account } = accountResponse;
        res.json({ error: accountError, response: { account, token } });
      });
    }
  });
};

export {
  findUsers,
  createUser,
  authenticateUser,
};
