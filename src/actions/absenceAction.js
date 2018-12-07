import * as types from '../types';
import fire from '../firebaseConfig';

const absenceRef = fire.database().ref().child('Absences');
const absenceStorage = fire.storage().ref();

export const absLoading = (isLoading = true) => ({
  type: types.LOADING_ABSENCE,
  payload: isLoading
});

export const fetchAllAbsences = () => dispatch => {
  dispatch(absLoading());
  absenceRef.on("value", snapshot => {
    let abs = [];
    snapshot.forEach(childSnapshot => {
      abs.push({ id: childSnapshot.key, ...childSnapshot.val() });
    });
    dispatch({
      type: types.FETCH_ALL_ABSENCE,
      payload: abs
    });
  });
}

export const fetchOneDocument = ({id, filename}) => dispatch => {
  dispatch(absLoading());
  const documentFetch = absenceStorage.child(`absence/${id}/${filename}`);
  documentFetch
    .getDownloadURL()
    .then(url => {
      dispatch({
        type: types.FETCH_DOCUMENT_URL,
        payload: url
      });
    })
    .catch(err => console.log(err));
}
