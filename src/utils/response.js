/* Response formats for external API calls */
const apiResponse = (res, { response = null, error = null, status = 200 }) =>
  res.status(status).json({ response, error, status });

/* Response formats for database calls */

// Returns the newly created document id
const createResponse = (res, response) => {
  res({ response: response.id, status: res.status });
};

const errorResponse = (res, error) => res({ error, status: res.status });

const snapshotToDocument = snapshot => ({ id: snapshot.id, ...snapshot.data() });

const snapshotToArray = (snapshot) => {
  const list = [];
  snapshot.forEach(doc => list.push(snapshotToDocument(doc)));
  return list;
};

// Returns a single document or null if not found
const documentResponse = (res, snapshot) => {
  const documentsFound = snapshotToArray(snapshot);
  const documentFound = documentsFound.length ? documentsFound[0] : null;
  const status = !documentFound ? 404 : 200;
  res({ response: documentFound, status });
};

// Returns an array of documents
const paginateResponse = (res, snapshot) => res({ response: snapshotToArray(snapshot) });

export {
  apiResponse,
  createResponse,
  documentResponse,
  errorResponse,
  paginateResponse,
};
