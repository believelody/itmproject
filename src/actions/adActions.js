import * as types from '../types';
import firebase from 'firebase';
import firebaseConfig from '../firebaseConfig';

firebase.initializeApp(firebaseConfig);

const adRef = firebase.database().ref().child('Annonces');

export const adLoading = (isLoading = true) => ({
  type: types.AD_LOADING,
  payload: isLoading
});

export const fetchAllAds = () => dispatch => {
  dispatch(adLoading());
  adRef.on('value', snapshot => {
    let ads = [];
    snapshot.forEach(childSnapshot => {
      ads.push({id: childSnapshot.key, ...childSnapshot.val()});
    });
    dispatch({
      type: types.ALL_ADS,
      payload: ads
    });    
  })
}
