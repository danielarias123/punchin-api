import * as account from './account';
import * as user from './user';

const databaseActions = {
  ...account,
  ...user,
};

export default databaseActions;
