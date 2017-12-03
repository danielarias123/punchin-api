const Account = payload => ({
  user: null,
  private: false,
  active: true,
  role: 'OWNER',
  position: null,
  company: null,
  pay: null,
  createdAt: new Date(),
  ...payload,
});

export default Account;
