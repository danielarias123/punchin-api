const Shift = payload => ({
  account: null,
  active: true,
  company: null,
  location: null,
  position: null,
  requireLocation: true,
  notes: '',
  scheduled: null,
  actual: null,
  createdAt: new Date(),
  ...payload,
});

export default Shift;
