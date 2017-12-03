/* Response formats for external API calls */
const apiResponse = (res, { response = null, error = null, status = 200 }) =>
  res.status(status).json({ response, error, status });

/* Response formats for database calls */

// Returns the newly created document id
const createResponse = (res, response) => {
  res({ response: response.id, status: res.status });
};

const errorResponse = (res, error) => res({ error, status: res.status });

// Converts a DocumentSnapshot to a readable document
const snapshotToDocument = snapshot => ({ id: snapshot.id, ...snapshot.data() });

const snapshotToArray = snapshot => snapshot.docs.map(doc => snapshotToDocument(doc));

// Returns a single document with populated subdocuments
const documentResponse = async (res, snapshot, populateFields = []) => {
  const documentsFound = snapshotToArray(snapshot, populateFields);
  const documentFound = documentsFound.length ? documentsFound[0] : null;
  if (populateFields.length) {
    const referenceFields = [];
    populateFields.forEach(field => documentFound[field] ?
      referenceFields.push(documentFound[field].get()) : null);

    // Get subdocument snapshots
    const updatedFields = await Promise.all(referenceFields);
    // Populate subdocuments
    populateFields.forEach((field, index) => {
      documentFound[field] = snapshotToDocument(updatedFields[index]);
    });
  }
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
