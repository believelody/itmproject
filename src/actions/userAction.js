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

// export const fetchUserSuccess = data => ({
//   type: types.FETCH_USER_SUCCESS,
//   payload: data
// });

const userFailure = errors => ({type: types.USER_FAIL, payload: errors});

export const fetchAllUsers = () => dispatch => {
  dispatch(userLoading());
  userRef.on("value", snapshot => {
    // Another way to fill users array
    // let i = 0;
    // let users = Object.values(snapshot.val());
    // for (let user in snapshot.val()) users[i].id = user;
    let users = [];
    snapshot.forEach(childSnapshot => {
      users.push({id: childSnapshot.key, ...childSnapshot.val()});
    });
    dispatch({
      type: types.FETCH_ALL_USERS,
      payload: users
    });
  });
}

export const fetchOneUser = id => dispatch => {
  dispatch(userLoading());
  userRef.child(id).once('value', snapshot => {
    dispatch({
      type: types.FETCH_ONE_USER,
      payload: {id: snapshot.key, ...snapshot.val()}
    });
  });
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
