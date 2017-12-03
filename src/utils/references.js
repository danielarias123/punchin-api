import database from './database';

// List of fields that have external collection document references
const referenceConfig = [
  {
    field: 'user',
    collection: 'users',
  },
  {
    field: 'account',
    collection: 'accounts',
  },
];

const hasDatabaseReference = field => referenceConfig.find(reference => reference.field === field);

const attachReferences = (payload = {}) => {
  const updatedPayload = { ...payload };
  Object.keys(updatedPayload).forEach((field) => {
    const referenceField = hasDatabaseReference(field);
    if (referenceField && payload[field]) {
      updatedPayload[field] =
        database.collection(referenceField.collection).doc(payload[field]);
    }
  });
  return updatedPayload;
};

export {
  attachReferences,
  hasDatabaseReference,
};
