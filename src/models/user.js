const User = payload => ({
  name: null,
  email: '',
  password: '',
  phone: '',
  avatar: '',
  createdAt: new Date(),
  ...payload,
});

export default User;
