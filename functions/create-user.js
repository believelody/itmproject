import bodyParser from "body-parser";
import firebaseAdmin from '../misc/firebaseAdmin';

const adminAuth = firebaseAdmin.auth();

exports.handler = (event, context, callback) => {
  const { email, password } = JSON.parse(event.body);

  adminAuth
    .createUser({email, password})
    .then(userRecord => {
      callback(null, {
        statusCode: 200
      });
    })
    .catch((error) => {
      let msg = '';

      if (error.code === 'auth/invalid-password') {
        msg = `L'identifiant de l'appareil doit avoir au moins 6 caractères`;
      }
      else if (error.code === 'auth/email-already-exists') {
        msg = `L'email indiqué est déjà utilisé`;
      }

      callback(null, {
        statusCode: 400,
        body: JSON.stringify({code: error.code, msg})
      });
    });
}
