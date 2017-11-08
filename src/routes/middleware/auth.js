import jwt from 'jsonwebtoken';
import { initializeEnvironment } from '../../utils/environment';

// Load environment variables from .env file
initializeEnvironment();

const { JWT_SECRET } = process.env;

// Auth middleware the validates if valid token was passed
const authCheck = (req, res, next) => {
  // Check header for token
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ error: 'Authentification Failed' });
      } else {
        // If authorized, save token for subsequent requests
        req.token = decodedToken;
        next();
      }
    });
  } else {
    // No token found
    res.status(401).json({ error: 'No Authentification Token Found' });
  }
};

export default authCheck;
