import jwt from 'jsonwebtoken';
import { apiResponse } from '../../utils/response';

// Load environment variables
require('dotenv').config();

const { JWT_SECRET } = process.env;

// Auth middleware the validates if valid token was passed
const authCheck = (req, res, next) => {
  // Check header for token
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, JWT_SECRET, (error, decodedToken) => {
      // Check if token is valid
      if (error) return apiResponse(res, { status: 401, error: 'Authentification Failed' });

      // Save token for subsequent requests since its valid
      req.token = decodedToken;
      return next();
    });
  } else {
    // No token found
    apiResponse(res, { status: 401, error: 'No Authentification Token Found' });
  }
};

export default authCheck;
