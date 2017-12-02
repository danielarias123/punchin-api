
import jwt from 'jsonwebtoken';
import { generate, verify } from 'password-hash';
import database from '../database';
import { apiResponse } from '../utils/response';

// Load environment variables
require('dotenv').config();

const { JWT_SECRET } = process.env;

// Returns all users
const findUsers = async (req, res) => {
  const usersResponse = await database.findUsers();
  apiResponse(res, usersResponse);
};

// Creates a user
const createUser = async (req, res) => {
  const { password, email, ...rest } = req.body;
  const userPayload = {
    email,
    password: generate(password),
    ...rest,
  };

  // Check if the user already exists
  const { response: userFound } = await database.findUser('email', email);
  if (userFound) return apiResponse(res, { error: 'User with email already exists', status: 400 });

  const userResponse = await database.createUser(userPayload);
  let createResponse = {};
  if (userResponse.error) {
    createResponse = userResponse;
  } else {
    // We also create a base account for them
    createResponse = await database.createAccount({ user: userResponse.response });
  }
  return apiResponse(res, createResponse);
};

// Authenticates a user
const authenticateUser = async (req, res) => {
  const { email, password } = req.body;
  const userResponse = await database.findUser('email', email);
  const userFound = userResponse.response;
  // Check if user exists for email
  if (!userFound) return apiResponse(res, { ...userResponse, error: 'User not found for email' });

  // Check password
  if (!verify(password, userFound.password)) return apiResponse(res, { error: 'Invalid Credentials', status: 401 });

  // Create a new JWT token since credentails were valid
  const token = jwt.sign({ data: userFound.id }, JWT_SECRET, { expiresIn: '24h' });

  // Find the user's account
  const { response: accountFound } = await database.findAccount('user', userFound.id);

  const authResponse = {
    response: {
      account: { ...accountFound, user: userFound },
      token,
    },
  };

  return apiResponse(res, authResponse);
};

export {
  authenticateUser,
  createUser,
  findUsers,
};
