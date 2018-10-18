import * as types from '../types';
import firebase from 'firebase';
import firebaseConfig from '../firebaseConfig';

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

}

export const fetchOneUser = () => dispatch => {

}

export const deleteUser = () => dispatch => {
  
}
