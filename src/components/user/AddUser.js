import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { addUser, clearUserFailure, fetchOneUser } from '../../actions/userAction';
// import { Input } from 'reactstrap';
import { Form, Button, Container, Message, Input, Select, Divider, Image, Radio, Loader } from 'semantic-ui-react';
import fire from '../../firebaseConfig';

const fireStorage = fire.storage();

class AddUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      preview: '',
      idNFC: '',
      email: '',
      nom: '',
      prenom: '',
      poste: '',
      sexe: '',
      titre: 'Mr',
      adresse: '',
      ville: '',
      cp: '',
      niveau: '',
      naissance: '',
      lieu: '',
      pays: '',
      img: '',
      telephone: '',
      visible: false,
      errors: []
    };
  }

  componentDidMount() {
    // console.log(this.props.match.params.user_id);
    if (this.props.match.params.user_id) {
      console.log('edit');
      this.props.fetchOneUser(this.props.match.params.user_id);
    }
    else console.log('new');
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user && nextProps.user.errors.length > 0) {
      this.setState({ errors: nextProps.user.errors, visible: true });
    }

    if (nextProps.user && nextProps.user.selectedUser) {
      if (nextProps.user.selectedUser.img) {
        const documentFetch = fireStorage.ref().child(`avatar/${nextProps.user.selectedUser.id}/${nextProps.user.selectedUser.img}`);
        this.setState({ preview: '' });

        documentFetch.getDownloadURL().then(avatar => this.setState({ preview: avatar }));
      }
      this.setState({
        idNFC: nextProps.user.selectedUser.id || '',
        nom: nextProps.user.selectedUser.nom || '',
        prenom: nextProps.user.selectedUser.prenom || '',
        email: nextProps.user.selectedUser.email || '',
        poste: nextProps.user.selectedUser.poste || '',
        sexe: nextProps.user.selectedUser.sexe || '',
        titre: nextProps.user.selectedUser.titre,
        adresse: nextProps.user.selectedUser.adresse || '',
        ville: nextProps.user.selectedUser.ville || '',
        cp: nextProps.user.selectedUser.cp || '',
        naissance: nextProps.user.selectedUser.naissance || '',
        lieu: nextProps.user.selectedUser.lieu || '',
        pays: nextProps.user.selectedUser.pays || '',
        img: nextProps.user.selectedUser.img || '',
        niveau: nextProps.user.selectedUser.niveau || '',
        telephone: nextProps.user.selectedUser.telephone || '',
        preview: nextProps.user.selectedUser.avatar || ''
      });
    }
  }

  handleChange = ({target}) => {
    if (target.id === 'img') {
      this.setState({ preview: URL.createObjectURL(target.files[0]), img: target.files[0] });
    }
    else {
      this.setState({ [target.name]: target.value });
    }
  }

  handleDismiss = (codeLabel) => {
    if (this.state.errors.length > 0) {
      this.setState({ errors: this.state.errors.filter(err => err.code !== codeLabel) });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.props.user.errors.length > 0) {
      this.props.clearUserFailure();
    }

    let {
      idNFC,
      titre,
      nom,
      prenom,
      email,
      niveau,
      poste,
      sexe,
      adresse,
      ville,
      cp,
      img,
      naissance,
      lieu,
      pays,
      telephone,
      errors
    } = this.state;

    let newUser = {
      titre,
      nom,
      prenom,
      email,
      niveau,
      poste,
      sexe,
      adresse,
      ville,
      cp,
      telephone,
      naissance,
      lieu,
      pays,
      role: (this.props.user.selectedUser && this.props.user.selectedUser.role !== 'user') ? this.props.user.selectedUser.role : 'user'
    };

    this.props.addUser(newUser, img !== undefined ? img : null, idNFC, this.props.history, this.props.user.selectedUser);

    this.setState({
      idNFC: errors.find(err => err.code === 'idNFC') ? '' : idNFC,
      email: errors.find(err => err.code === 'email') ? '' : email,
      nom: errors.find(err => err.code === 'nom') ? '' : nom,
      prenom: errors.find(err => err.code === 'prenom') ? '' : prenom,
      titre: errors.find(err => err.code === 'titre') ? '' : titre,
      niveau: errors.find(err => err.code === 'niveau') ? '' : niveau,
      adresse: errors.find(err => err.code === 'adresse') ? '' : adresse,
      ville: errors.find(err => err.code === 'ville') ? '' : ville,
      cp: errors.find(err => err.code === 'cp') ? '' : cp,
      naissance: errors.find(err => err.code === 'naissance') ? '' : naissance,
      lieu: errors.find(err => err.code === 'lieu') ? '' : lieu,
      pays: errors.find(err => err.code === 'pays') ? '' : pays,
      img: errors.find(err => err.code === 'img') ? '../../img/itm_avatar_user_male.png' : img,
      poste: errors.find(err => err.code === 'poste') ? '' : poste,
      sexe: errors.find(err => err.code === 'sexe') ? '' : sexe,
      telephone: errors.find(err => err.code === 'telephone') ? '' : telephone,
      preview: '',
      errors: []
    });
  }

  clearInput = ({target}) => {
    if (this.state.errors.length > 0) {
      if (target.id) {
        this.setState({ errors: this.state.errors.filter(err => err.code !== target.id) });
      }
      else {
        this.setState({ errors: this.state.errors.filter(err => err.code !== target.name) });
      }
    }
  }

  validationFeedBack = (errors, codeLabel) => {
     if (errors.length > 0 && errors.find(err => err.code === codeLabel) && this.state.visible) {
       return (
        <Message
          header='Erreur'
          content={errors[errors.indexOf(errors.find(err => err.code === codeLabel))].msg}
          onDismiss={() => this.handleDismiss(codeLabel)}
          negative
        />
       )
     }
  }

  render() {
    const { idNFC, titre, email, nom, prenom, niveau, poste, sexe, adresse, ville, cp, naissance, lieu, pays, img, telephone, errors, preview } = this.state;
    const { loading, selectedUser } = this.props.user;

    return (
      <Container>
          <Button onClick={() => this.props.history.goBack()} basic color='blue'>Revenir en arrière</Button>
          {
            loading && <Loader active content='Chargement...' />
          }
          {
            !loading &&
            <Form style={{padding: '10px 0'}} onSubmit={this.handleSubmit} noValidate>
              <Form.Group style={{paddingBottom: 20}}>
                <Form.Field
                  error={(errors.length > 0 && errors.find(err => err.code === 'img')) ? true : false}
                >
                  <Image size='medium' src={preview || require((selectedUser && selectedUser.sexe === 'Femme') ? '../../img/itm_avatar_user_woman.jpg' : '../../img/itm_avatar_user_male.png')} alt='profil' />
                  <Input
                    type='file'
                    id='img'
                    name='img'
                    label="Photo de l'employé"
                    accept='image/png, image/jpeg, image/jpg'
                    onChange={this.handleChange}
                    onFocus={this.clearInput}
                  />
                  {this.validationFeedBack(errors, 'img')}
                </Form.Field>
              </Form.Group>

              <Form.Group style={{padding: 20}}>
                <label>Identifiant de l'appareil personnel</label><span style={{color: 'red'}}>*</span>
                <Form.Field
                  required
                  error={(errors.length > 0 && errors.find(err => err.code === 'idNFC')) ? true : false}
                  width={10}
                >
                  <Input
                    name='idNFC'
                    value={idNFC}
                    onChange={this.handleChange}
                    onFocus={this.clearInput}
                  />
                </Form.Field>
                { this.validationFeedBack(errors, "idNFC") }
              </Form.Group>

              <Form.Group style={{paddingBottom: 20}} inline>
                <label>Civilité</label>
                <Form.Field
                  control={Radio}
                  label='Monsieur'
                  value='Mr'
                  checked={titre === 'Mr'}
                  onChange={(e, {value}) => this.setState({ titre: value })}
                  required
                />
                <Form.Field
                  control={Radio}
                  label='Madame'
                  value='Mme'
                  checked={titre === 'Mme'}
                  onChange={(e, {value}) => this.setState({ titre: value })}
                  required
                />
                <Form.Field
                  control={Radio}
                  label='Mademoiselle'
                  value='Mlle'
                  checked={titre === 'Mlle'}
                  onChange={(e, {value}) => this.setState({ titre: value })}
                  required
                />
              </Form.Group>

              <Divider horizontal content='Poste occupé' />
              <Form.Group style={{paddingBottom: 40}} widths='equal'>
                <Form.Field>
                  <Select
                    placeholder='Choisissez un niveau'
                    text={niveau || ''}
                    id='niveau'
                    error={(errors.length > 0 && errors.find(err => err.code === 'niveau')) ? true : false}
                    onChange={(e, {value}) => this.setState({ niveau: value})}
                    onFocus={(e) => this.clearInput(e)}
                    options={
                      [
                        {text: 'Ingénieur', value: 'Ingénieur'},
                        {text: 'Technicien', value: 'Technicien'},
                        {text: 'Gardien', value: 'Gardien'}
                      ]
                    }
                  />
                  { this.validationFeedBack(errors, "niveau") }
                </Form.Field>
                <Form.Field
                  error={(errors.length > 0 && errors.find(err => err.code === 'poste')) ? true : false}
                >
                  <Input
                    name='poste'
                    label='Poste'
                    placeholder='Intitulé du poste'
                    value={poste}
                    onChange={this.handleChange}
                    onFocus={this.clearInput}
                    required
                  />
                  { this.validationFeedBack(errors, "poste") }
                </Form.Field>
                <Form.Field>
                  <Select
                    placeholder='Sexe'
                    // text={sexe || ''}
                    id='sexe'
                    onChange={(e, {value}) => this.setState({ sexe: value})}
                    onFocus={(e) => this.clearInput(e)}
                    error={(errors.length > 0 && errors.find(err => err.code === 'sexe')) ? true : false}
                    options={
                      [
                        {text: 'Homme', value: 'Homme'},
                        {text: 'Femme', value: 'Femme'}
                      ]
                    }
                  />
                  { this.validationFeedBack(errors, "sexe") }
                </Form.Field>
              </Form.Group>

              <Divider horizontal content='Identité' />
              <Form.Group widths='equal'>
                <Form.Field
                  error={(errors.length > 0 && errors.find(err => err.code === 'nom')) ? true : false}
                >
                  <Input
                    type='text'
                    name='nom'
                    label='Nom'
                    placeholder='Entrez votre (vos) nom(s)'
                    onChange={this.handleChange}
                    onFocus={this.clearInput}
                    value={nom}
                    required
                  />
                  { this.validationFeedBack(errors, "nom") }
                </Form.Field>
                <Form.Field
                  error={(errors.length > 0 && errors.find(err => err.code === 'prenom')) ? true : false}
                >
                  <Input
                    type='text'
                    name='prenom'
                    label='Prénom'
                    placeholder='Entrez votre (vos) prénom(s)'
                    onChange={this.handleChange}
                    onFocus={this.clearInput}
                    value={prenom}
                    required
                  />
                  { this.validationFeedBack(errors, "prenom") }
                </Form.Field>
              </Form.Group>

              <Form.Group style={{paddingBottom: 40}} widths='equal'>
                <Form.Field
                  error={(errors.length > 0 && errors.find(err => err.code === 'telephone')) ? true : false}
                >
                  <Input
                    type='telephone'
                    name='telephone'
                    label='Telephone'
                    placeholder='Entrez votre numéro de téléphone'
                    onChange={this.handleChange}
                    onFocus={this.clearInput}
                    value={telephone}
                    required
                  />
                  { this.validationFeedBack(errors, "telephone") }
                </Form.Field>
                <Form.Field
                  error={(errors.length > 0 && errors.find(err => err.code === 'email')) ? true : false}
                >
                  <Input
                    type='email'
                    name='email'
                    label='Email'
                    placeholder='exemple: johndoe@yahoo.com'
                    onChange={this.handleChange}
                    onFocus={this.clearInput}
                    value={email}
                    required
                  />
                  { this.validationFeedBack(errors, "email") }
                </Form.Field>
              </Form.Group>

              <Divider horizontal content='Informations personnelles' />
              <Form.Group widths='equal'>
                <Form.Field
                  error={(errors.length > 0 && errors.find(err => err.code === 'naissance')) ? true : false}
                >
                  <Input
                    type='date'
                    name='naissance'
                    label='Date de naissance'
                    placeholder='Entrez votre date de naissance'
                    onChange={this.handleChange}
                    onFocus={this.clearInput}
                    value={naissance}
                    required
                  />
                  { this.validationFeedBack(errors, "naissance") }
                </Form.Field>
                <Form.Field
                  error={(errors.length > 0 && errors.find(err => err.code === 'lieu')) ? true : false}
                >
                  <Input
                    type='text'
                    name='lieu'
                    label='Lieu'
                    placeholder='Votre lieu de naissance'
                    onChange={this.handleChange}
                    onFocus={this.clearInput}
                    value={lieu}
                    required
                  />
                  { this.validationFeedBack(errors, "lieu") }
                </Form.Field>
                <Form.Field
                  error={(errors.length > 0 && errors.find(err => err.code === 'pays')) ? true : false}
                >
                  <Input
                    type='text'
                    name='pays'
                    label='Pays'
                    placeholder='Votre pays de naissance'
                    onChange={this.handleChange}
                    onFocus={this.clearInput}
                    value={pays}
                    required
                  />
                  { this.validationFeedBack(errors, "pays") }
                </Form.Field>
              </Form.Group>

              <Form.Group style={{paddingBottom: 20}}>
                <Form.Field
                  width={8}
                  error={(errors.length > 0 && errors.find(err => err.code === 'adresse')) ? true : false}
                >
                  <Input
                    type='text'
                    name='adresse'
                    label='Adresse'
                    placeholder='Votre adresse'
                    onChange={this.handleChange}
                    onFocus={this.clearInput}
                    value={adresse}
                    required
                  />
                  { this.validationFeedBack(errors, "adresse") }
                </Form.Field>
                <Form.Field
                  width={5}
                  error={(errors.length > 0 && errors.find(err => err.code === 'ville')) ? true : false}
                >
                  <Input
                    type='text'
                    name='ville'
                    label='Ville'
                    placeholder='Ville ou commune'
                    onChange={this.handleChange}
                    onFocus={this.clearInput}
                    value={ville}
                    required
                  />
                  { this.validationFeedBack(errors, "ville") }
                </Form.Field>
                <Form.Field
                  width={3}
                  error={(errors.length > 0 && errors.find(err => err.code === 'cp')) ? true : false}
                >
                  <Input
                    type='text'
                    name='cp'
                    label='CP'
                    placeholder='Le code postal de votre commune'
                    onChange={this.handleChange}
                    onFocus={this.clearInput}
                    value={cp}
                    required
                  />
                  { this.validationFeedBack(errors, "cp") }
                </Form.Field>
              </Form.Group>
              {this.validationFeedBack(errors, 'auth-submit')}
              <Button color='green'>Submit</Button>
            </Form>
          }
      </Container>
    );
  }
}

AddUser.propTypes = {
  addUser: PropTypes.func.isRequired,
  clearUserFailure: PropTypes.func.isRequired,
  fetchOneUser: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, { addUser, clearUserFailure, fetchOneUser })(AddUser);
