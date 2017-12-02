// Initialize a Firestore DB instance

import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

// Initialize Firebase Admin SDK to access the Firebase Realtime Database.
admin.initializeApp(functions.config().firebase);

export default admin.firestore();
