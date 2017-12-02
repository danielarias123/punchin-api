import * as account from './account';
import * as user from './user';
// import * as shift from './shift';

const databaseActions = {
  ...account,
  ...user,
  // ...shift,
};

export default databaseActions;
