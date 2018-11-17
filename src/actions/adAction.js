import * as types from '../types';
import firebase from 'firebase';
import firebaseConfig from '../firebaseConfig';

const adRef = firebase.database().ref().child('Annonces');

export const adLoading = (isLoading = true) => ({
  type: types.AD_LOADING,
  payload: isLoading
});

export const fetchAllAds = () => dispatch => {
  dispatch(adLoading());
  adRef.on('value', snapshot => {
    dispatch({
      type: types.ALL_ADS,
      payload: snapshot.val()
    });
  })
}
