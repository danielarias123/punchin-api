
import database from '../database';
import { apiResponse } from '../utils/response';

// Returns all users
const findUsers = async (req, res) => {
  const usersResponse = await database.findUsers();
  apiResponse(res, usersResponse);
};

export {
  findUsers,
};
