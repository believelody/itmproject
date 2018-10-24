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
})

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
  // users.map((user, i) => {
  //   if (i <= 4) {
  //     user.poste = 'ingenieur';
  //   }
  //   if (i > 4 && i <= 14) {
  //     user.poste = 'gardien';
  //   }
  //   if (i > 14) {
  //     user.poste = 'technicien';
  //   }
  // });
  userRef.push().set(user);

}

export const deleteUser = id => dispatch => {
  userRef.child(id).remove();
}
