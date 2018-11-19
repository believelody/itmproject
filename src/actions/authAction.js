import * as types from '../types';
import fire from '../firebaseConfig';

const fireAuth = fire.auth();

export const authLoading = (isLoading = true) => ({type: types.AUTH_LOADING, payload: isLoading});

export const authFailure = errors => ({ type: types.AUTH_FAILED, payload: errors });

export const register = ({email, password}) => dispatch => {
  if (email === '') {
    dispatch(authFailure({code: 'email', msg: 'Le champ Email est requis'}));
  }
  if (password === '') {
    dispatch(authFailure({code: 'password', msg: 'Le champ Mot de passe est requis'}));
  }
  if (email && password) {
    fireAuth
    .createUserWithEmailAndPassword(email, password)
    .then(user => dispatch({
      type: types.AUTHENTICATED,
      payload: user
    }))
    .catch(err => {
      const errorCode = err.code;
      const errorMessage = err.message;

      console.log(errorCode, errorMessage);
    });
  }
}

export const login = ({email, password}) => dispatch => {
  if (email === '') {
    dispatch(authFailure({code: 'email', msg: 'Le champ Email est requis'}));
  }
  if (password === '') {
    dispatch(authFailure({code: 'password', msg: 'Le champ Mot de passe est requis'}));
  }
  if (email && password) {
    fireAuth
    .signInWithEmailAndPassword(email, password)
    .then(user => {
      dispatch({
        type: types.AUTHENTICATED,
        payload: user
      });
      window.location.href = '/';
    })
    .catch(err => {
      const errorCode = err.code;
      const errorMessage = err.message;

      console.log(errorCode, errorMessage);

      dispatch(authFailure({ code: 'authentification', msg: 'Aucun utilisateur ne correspond à ces identifiants' }));
    });
  }
}

export const logout = (cb = null) => fireAuth.signOut()
.then(() => {
  localStorage.removeItem('user_token');
  cb(false);
});

export const clearAuthFailure = () => ({ type: types.CLEAR_AUTH_FAILURE });
