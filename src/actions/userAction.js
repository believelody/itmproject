import * as types from '../types';
import { toast } from 'react-toastify';
import fire from '../firebaseConfig';
import axios from 'axios';

const userRef = fire.database().ref().child('User');
const fireDB = fire.database();
const fireAuth = fire.auth();

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

export const addUser = (user, idNFC, cb, selectedUser) => dispatch => {
  if (idNFC === '') {
    dispatch(userFailure({code: 'idNFC', msg: "Le champ Identifiant de l'appareil est requis"}));
  }
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
  if (idNFC !== '' && user.nom !== '' && user.email !== '' && user.poste !== '' && user.sexe !== '' && user.prenom !== '' && user.adresse !== '' && user.ville !== '' && user.cp !== '' && user.telephone !== '' && user.naissance !== '' && user.lieu !== '' && user.pays !== '' && user.titre !== '' && user.niveau !== '') {
    if (selectedUser) {
      let updates = {};
      updates[`User/${selectedUser.id}`] = user;
      fireDB
        .ref()
        .update(updates)
        .then(() => {
          let content = `${selectedUser.prenom} ${selectedUser.nom} a bien été ${selectedUser.sexe === 'Femme' ? 'modifieé' : 'modifié'}`;

          toast.success(content, {
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            className: 'toast-container-success'
          });
          cb.goBack();
        });
    }
    else {
      axios.post('/netlify-functions/create-user', user);
      // fireAuth
      //   .createUserWithEmailAndPassword(user.email, idNFC)
      //   .then(() => {
      //     userRef
      //       .child(idNFC)
      //       .set(user)
      //       .then(() => {
      //         let content = `${user.prenom} ${user.nom} a bien été ${user.sexe === 'Femme' ? 'ajoutée' : 'ajouté'}`;
      //
      //         toast.success(content, {
      //           position: "bottom-right",
      //           autoClose: 5000,
      //           hideProgressBar: false,
      //           closeOnClick: true,
      //           pauseOnHover: true,
      //           draggable: true,
      //           className: 'toast-container-success'
      //         });
      //         cb.goBack();
      //       });
      //   })
      //   .catch(error => {
      //     let content = `Erreur: l'utilisateur que vous essayez d'enregistrer existe déjà`;
      //
      //     toast.error(content, {
      //       position: "bottom-right",
      //       autoClose: 5000,
      //       hideProgressBar: false,
      //       closeOnClick: true,
      //       pauseOnHover: true,
      //       draggable: true,
      //       className: 'toast-container-failure'
      //     });
      //   });
    }
  }
}

export const clearUserFailure = () => ({ type: types.CLEAR_USER_FAILURE });

export const deleteUser = user => dispatch => {
  if (user.role === 'admin') {
    let content = `Désolé, l'admin ne peut être supprimé. Enlever à cet utilisateur ces droits d'administration puis supprimer le`;

    toast.warning(content, {
      position: "bottom-right",
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      className: 'toast-container-warning'
    });
  }
  else {
    userRef.child(user.id).remove().then(() => {
      let content = `${user.prenom} ${user.nom} a bien été ${user.sexe === 'Femme' ? 'supprimée' : 'supprimé'}`;

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
}

export const setAdminRole = (mdp, selectedUser) => dispatch => {
  if (mdp === '') {
    dispatch(userFailure({code: 'mdp', msg: "Le champ Mot de passe est requis"}));
  }
  else {
    fireAuth.onAuthStateChanged(user => {
      if (user) {
        console.log(user);
      }
    });
  }
  // user.role = 'admin';
  //
  // userRef
  //   .child(user.id)
  //   .update(user)
  //   .then(() => {
  //     let content = `Vos modifications ont bien été prises en compte`;
  //
  //     toast.success(content, {
  //       position: "bottom-right",
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       className: 'toast-container-success'
  //     });
  //   });
}
