import * as types from '../types';
import fire from '../firebaseConfig';

const fireAuth = fire.auth();
const fireDB = fire.database();

export const authLoading = (isLoading = true) => ({type: types.AUTH_LOADING, payload: isLoading});

export const authFailure = errors => ({ type: types.AUTH_FAILED, payload: errors });

export const authListener = () => dispatch => {
  dispatch(authLoading());
  fire.auth().onAuthStateChanged(user => {
    if (user) {
      console.log(user);
      localStorage.setItem('user_token', user.uid);
      dispatch({ type: types.AUTH_CHECK, payload: true });
      dispatch(authCurrentUser(user));
    }
    else {
      dispatch({ type: types.AUTH_CHECK, payload: false });
      localStorage.removeItem('user_token');
    }
  });
}

export const authCurrentUser = user => dispatch => {
  fireDB.ref('User').on("value", snapshot => {
    snapshot.forEach(childSnapshot => {
      let userMatch = childSnapshot.val();
      if (userMatch.email === user.email) {
        dispatch({
          type: types.AUTHENTICATED,
          payload: userMatch
        });
      }
    });
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
    .then(({user}) => {
      dispatch(authLoading());
      dispatch(authCurrentUser(user));
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

export const logout = () => dispatch =>
fireAuth
  .signOut()
  .then(() => {
    dispatch(authLoading());
    localStorage.removeItem('user_token');
    dispatch({
      type: types.AUTHENTICATED,
      payload: null
    });
  });

export const clearAuthFailure = () => ({ type: types.CLEAR_AUTH_FAILURE });
