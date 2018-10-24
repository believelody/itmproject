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
    return dispatch(userFailure({code: 'name', msg: 'Name is required'}));
  }
  if (user.email === '') {
    return dispatch(userFailure({code: 'email', msg: 'Email is required'}));
  }
  if (user.poste === '') {
    return dispatch(userFailure({code: 'poste', msg: 'Poste is required'}));
  }

  userRef.push().set(user);
}

export const deleteUser = id => dispatch => {
  userRef.child(id).remove();
}
