const sanitize = (body = {}) => {
  const sanitizedBody = { ...body };
  Object.keys(sanitizedBody).forEach((field) => {
    if (typeof body[field] === 'object') {
      sanitizedBody[field] = sanitize(body[field]);
      // Fix array issues
      /* eslint-disable no-use-before-define */
      if (body[field][0]) sanitizedBody[field] = objectToArray(body[field]);
    } else if (field === 'date') {
      // Fix date issues with JSON.stringify
      sanitizedBody[field] = new Date(body[field]);
    }
  });
  return sanitizedBody;
};

const objectToArray = (object = {}) => Object.keys(object).map(key => sanitize(object[key]));

export {
  sanitize,
};
