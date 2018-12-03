const admin = require('firebase-admin');
const serviceAccount = require('../firebase-service-account/workspace-83667-firebase-adminsdk-kg22p-e8f59a7e8a.json');

const firebaseAdmin = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.REACT_APP_DATABASE_URL
});

module.exports = firebaseAdmin;
