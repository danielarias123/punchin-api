/* Response formats for external API calls */
const apiResponse = (res, { response = null, error = null, status = 200 }) =>
  res.status(status).json({ response, error, status });

/* Response formats for database calls */

// Converts a DocumentSnapshot to a readable document
const snapshotToDocument = snapshot => ({ id: snapshot.id, ...snapshot.data() });

// Returns the newly created document id
const createResponse = async (res, docRef) => {
  // Get the document snapshot
  const documentSnapshot = await docRef.get();
  res({ response: snapshotToDocument(documentSnapshot), status: res.status });
};

const errorResponse = (res, error) => res({ error, status: res.status });

const snapshotToArray = querySnapshot => querySnapshot.docs.map(doc => snapshotToDocument(doc));

// Returns a single document with populated subdocuments
const documentResponse = async (res, querySnapshot, populateFields = []) => {
  const documentsFound = snapshotToArray(querySnapshot, populateFields);
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
const paginateResponse = (res, querySnapshot) => res({ response: snapshotToArray(querySnapshot) });

export {
  apiResponse,
  createResponse,
  documentResponse,
  errorResponse,
  paginateResponse,
};
