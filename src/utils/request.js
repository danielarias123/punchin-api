const sanitize = (body = {}) => {
  const sanitizedBody = { ...body };
  Object.keys(sanitizedBody).forEach((field) => {
    if (typeof body[field] === 'object') {
      sanitizedBody[field] = sanitize(body[field]);
    } else if (field === 'date') {
      // Fix date issues with JSON.stringify
      sanitizedBody[field] = new Date(body[field]);
    }
  });
  return sanitizedBody;
};

export {
  sanitize,
};
