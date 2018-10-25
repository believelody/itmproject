import * as types from '../types';
import firebase from 'firebase';
import firebaseConfig from '../firebaseConfig';
import users from '../db/users';

firebase.initializeApp(firebaseConfig);

const userRef = firebase.database().ref().child('User');

export const userLoading = (isLoading = true) => ({
  type: types.USER_LOADING,
  payload: isLoading
});

export const fetchUserSuccess = data => ({
  type: types.FETCH_USER_SUCCESS,
  payload: data
});

const userFailure = errors => ({type: types.USER_FAIL, payload: errors});

export const fetchAllUsers = () => dispatch => {
  userRef.on("value", snapshot => {
    let i = 0;
    let users = Object.values(snapshot.val());
    for (let user in snapshot.val()) users[i].id = user;
    dispatch(fetchUserSuccess(users));
  });
}

export const fetchOneUser = () => dispatch => {

}

export const addUser = user => dispatch => {
  if (user.name === '') {
    dispatch(userFailure({code: 'name', msg: 'Le champ Name est requis'}));
  }
  if (user.email === '') {
    dispatch(userFailure({code: 'email', msg: 'Le champ Email est requis'}));
  }
  if (user.poste === '') {
    dispatch(userFailure({code: 'poste', msg: 'Le champ Poste est requis'}));
  }
  if (user.name !== '' && user.email !== '' && user.poste !== '') {
    userRef.push().set(user);
  }
}

export const clearUserFailure = () => ({ type: types.CLEAR_USER_FAILURE });

export const deleteUser = id => dispatch => {
  userRef.child(id).remove();
}
