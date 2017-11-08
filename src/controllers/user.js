import jwt from 'jsonwebtoken';
import { generate, verify } from 'password-hash';
import mongoose from 'mongoose';
import { initializeEnvironment } from '../utils/environment';

// Load environment variables from .env file
initializeEnvironment();

const { JWT_SECRET } = process.env;

const User = mongoose.model('User');

// Returns all users
const getUsers = (req, res) => {
  User.find({}, (err, users) => {
    if (err) res.send(err);
    res.json({ response: users });
  });
};

// Creates a user
const createUser = (req, res) => {
  const { email, password } = req.body;
  const newUser = new User({
    email,
    password: generate(password),
  });

  newUser.save((err, user) => {
    if (err) res.status(400).json({ error: err.message });
    res.json(user);
  });
};

// Authenticates a user
const authenticateUser = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err) throw err;

    if (!user) {
      res.status(401).json({ error: 'User not found' });
    } else if (!verify(password, user.password)) {
      res.status(401).json({ error: 'Invalid Credentials' });
    } else {
      const payload = { admin: user.admin };
      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });
      res.json({ response: { user, token } });
    }
  });
};

export {
  getUsers,
  createUser,
  authenticateUser,
};
