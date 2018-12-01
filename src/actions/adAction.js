import * as types from '../types';
import firebase from 'firebase';
import firebaseConfig from '../firebaseConfig';
import { toast } from 'react-toastify';

const adRef = firebase.database().ref().child('Annonces');

export const adLoading = (isLoading = true) => ({
  type: types.AD_LOADING,
  payload: isLoading
});

export const adFailure = error => ({
  type: types.AD_ERRORS,
  payload: error
});

export const fetchAllAds = () => dispatch => {
  dispatch(adLoading());
  adRef.on('value', snapshot => {
    let ads = [];
    snapshot.forEach(childSnapshot => {
      ads.unshift({id: childSnapshot.key, ...childSnapshot.val()});
    });
    dispatch({
      type: types.ALL_ADS,
      payload: ads
    });
  })
}

export const fetchOneAd = id => dispatch => {
  dispatch(adLoading());
  adRef.child(id).once('value', snapshot => {
    dispatch({
      type: types.SELECTED_AD,
      payload: {id: snapshot.key, ...snapshot.val()}
    });
  });
}

export const clearAdFailure = () => ({ type: types.CLEAR_AD_FAILURE });

export const clearSelectedAd = () => ({ type: types.CLEAR_SELECTED_AD });

export const addAd = data => dispatch => {
  if (data.title === '') {
    dispatch(adFailure({code: 'title', msg: 'Le champ Titre est requis'}));
  }
  if (data.text === '') {
    dispatch(adFailure({code: 'text', msg: "Le champ Contenu de l'annonce est requis"}));
  }
  if (data.title !== '' && data.text !== '') {
    adRef
      .push()
      .set(data)
      .then(() => {
        let content = `Votre annonce a bien été enregistrée`;

        toast.success(content, {
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          className: 'toast-container-success'
        });
      })
  }
}

export const editAd = (selectedAd, data) => dispatch => {
  if (data.title === '') {
    dispatch(adFailure({code: 'title', msg: 'Le champ Titre est requis'}));
  }
  if (data.text === '') {
    dispatch(adFailure({code: 'text', msg: "Le champ Contenu de l'annonce est requis"}));
  }
  if (data.title !== '' && data.text !== '') {
    adRef
      .child(selectedAd.id)
      .update(data)
      .then(() => {
        let content = `Votre annonce a bien été modifiée`;

        toast.success(content, {
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          className: 'toast-container-success'
        });
      })
  }
}

export const deleteAd = ad => dispatch => {
  adRef.child(ad.id).remove().then(() => {
    let content = `Votre annonce a bien été supprimée`;

    toast.error(content, {
      position: "bottom-right",
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      className: 'toast-container-failure'
    });
  });
}
