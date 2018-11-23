import * as types from '../types';
import fire from '../firebaseConfig';

const fireAuth = fire.auth();

export const authLoading = (isLoading = true) => ({type: types.AUTH_LOADING, payload: isLoading});

export const authFailure = errors => ({ type: types.AUTH_FAILED, payload: errors });

export const authListener = () => dispatch => {
  dispatch(authLoading());
  fire.auth().onAuthStateChanged(user => {
    if (user) {
      localStorage.setItem('user_token', user.uid);
      dispatch({ type: types.AUTH_CHECK, payload: true });
    }
    else {
      dispatch({ type: types.AUTH_CHECK, payload: false });
      localStorage.removeItem('user_token');
    }
  });
}

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
    .then(user => {
      dispatch(authLoading());
      dispatch({
        type: types.AUTHENTICATED,
        payload: user
      })
    })
    .catch(err => {
      const errorCode = err.code;
      const errorMessage = err.message;

      console.log(errorCode, errorMessage);
      dispatch(authLoading(false));
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
      dispatch(authLoading());
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
      dispatch(authLoading(false));
      dispatch(authFailure({ code: 'authentification', msg: 'Aucun utilisateur ne correspond à ces identifiants' }));
    });
  }
}

export const logout = () => dispatch => fireAuth.signOut()
.then(() => {
  dispatch(authLoading());
  localStorage.removeItem('user_token');
  dispatch({
    type: types.AUTHENTICATED,
    payload: null
  });
  // window.location.href = '/login';
});

export const clearAuthFailure = () => ({ type: types.CLEAR_AUTH_FAILURE });
