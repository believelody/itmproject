import * as types from '../types';
import { toast } from 'react-toastify';
import firebase from 'firebase';
import firebaseConfig from '../firebaseConfig';

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

export const addUser = (user, cb, selectedUser) => dispatch => {
  // console.log(selectedUser);
  if (user.nom === '') {
    dispatch(userFailure({code: 'nom', msg: 'Le champ Nom est requis'}));
  }
  if (user.email === '') {
    dispatch(userFailure({code: 'email', msg: 'Le champ Email est requis'}));
  }
  if (user.telephone === '') {
    dispatch(userFailure({code: 'telephone', msg: 'Le champ Téléphone est requis'}));
  }
  if (user.poste === '') {
    dispatch(userFailure({code: 'poste', msg: 'Le champ Poste est requis'}));
  }
  if (user.sexe === '') {
    dispatch(userFailure({code: 'sexe', msg: 'Le champ Sexe est requis'}));
  }
  if (user.titre === '') {
    dispatch(userFailure({code: 'titre', msg: 'Le champ Civilité est requis'}));
  }
  if (user.niveau === '') {
    dispatch(userFailure({code: 'niveau', msg: 'Le champ Niveau est requis'}));
  }
  if (user.prenom === '') {
    dispatch(userFailure({code: 'prenom', msg: 'Le champ Prénom est requis'}));
  }
  if (user.naissance === '') {
    dispatch(userFailure({code: 'naissance', msg: 'Le champ Date de naissance est requis'}));
  }
  if (user.lieu === '') {
    dispatch(userFailure({code: 'lieu', msg: 'Le champ Lieu de naissance est requis'}));
  }
  if (user.pays === '') {
    dispatch(userFailure({code: 'pays', msg: 'Le champ Pays est requis'}));
  }
  if (user.adresse === '') {
    dispatch(userFailure({code: 'adresse', msg: 'Le champ Adresse est requis'}));
  }
  if (user.ville === '') {
    dispatch(userFailure({code: 'ville', msg: 'Le champ Ville est requis'}));
  }
  if (user.cp === '') {
    dispatch(userFailure({code: 'cp', msg: 'Le champ Code Postal est requis'}));
  }
  if (user.nom !== '' && user.email !== '' && user.poste !== '' && user.sexe !== '' && user.prenom !== '' && user.adresse !== '' && user.ville !== '' && user.cp !== '' && user.telephone !== '' && user.naissance !== '' && user.lieu !== '' && user.pays !== '' && user.titre !== '' && user.niveau !== '') {
    if (selectedUser) {
      userRef
        .child(selectedUser.id)
        .update(user)
        .then(() => {
          let content = `${selectedUser.prenom} ${selectedUser.nom} a bien été ${selectedUser.sexe === 'Femme' ? 'modifieé' : 'modifié'}`;

          toast.success(content, {
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
          });
          cb.goBack();
        });
    }
    else {
      userRef
        .push()
        .set(user)
        .then(() => {
          let content = `${user.prenom} ${user.nom} a bien été ${user.sexe === 'Femme' ? 'ajoutée' : 'ajouté'}`;

          toast.success(content, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
          });
          cb.goBack();
        });
    }
  }
}

export const clearUserFailure = () => ({ type: types.CLEAR_USER_FAILURE });

export const deleteUser = user => dispatch => {
  userRef.child(user.id).remove().then(() => {
    let content = `${user.prenom} ${user.nom} a bien été ${user.sexe === 'Femme' ? 'supprimée' : 'supprimé'}`;

    toast.error(content, {
      position: "bottom-right",
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
    });
  });
}
