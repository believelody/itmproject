import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { addUser, clearUserFailure, fetchOneUser } from '../../actions/userAction';
// import { Container, Form, Label, Form.Input, Button, Form.Group, FormFeedback } from 'reactstrap';
import { Form, Button, Container, Message, Input, Select } from 'semantic-ui-react';

class AddUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
      poste: '',
      sexe: '',
      visible: false,
      errors: []
    };
  }

  componentDidMount() {
    if (this.props.match.params.user_id) {
      this.props.fetchOneUser(this.props.match.params.user_id);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user && nextProps.user.errors.length > 0) {
      this.setState({ errors: nextProps.user.errors, visible: true });
    }

    if (nextProps.user && nextProps.user.selectedUser) {
      this.setState({
        name: nextProps.user.selectedUser.name,
        email: nextProps.user.selectedUser.email,
        poste: nextProps.user.selectedUser.poste,
        sexe: nextProps.user.selectedUser.sexe
      });
    }
  }

  handleChange = ({target}) => this.setState({ [target.name]: target.value });

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

    let { name, email, poste, sexe, errors } = this.state
    let newUser = { name, email, poste, sexe, absence: false };
    console.log(newUser);
    this.props.addUser(newUser, this.props.history);

    // console.log(this.props.user.errors.length);

    this.setState({
      email: errors.find(err => err.code === 'email') ? '' : email,
      name: errors.find(err => err.code === 'name') ? '' : name,
      poste: errors.find(err => err.code === 'poste') ? '' : poste,
      sexe: errors.find(err => err.code === 'sexe') ? '' : sexe,
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
    const { email, name, poste, sexe, errors } = this.state;
    const { loading, selectedUser } = this.props.user;

    return (
      <Container>
          <NavLink to='/'><Button basic color='blue'>Revenir en arrière</Button></NavLink>
          <Form style={{padding: '10px 0'}} onSubmit={this.handleSubmit} noValidate>
            <Form.Group widths='equal'>
              <Form.Field
                error={(errors.length > 0 && errors.find(err => err.code === 'name')) ? true : false}
              >
                <Input
                  type='text'
                  name='name'
                  label='Name'
                  placeholder='Entrez vos noms et prénoms'
                  onChange={this.handleChange}
                  onFocus={this.clearInput}
                  value={name}
                  required
                />
                { this.validationFeedBack(errors, "name") }
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

            <Form.Group widths='equal'>
              <Form.Field>
                <Select
                  placeholder='Choisissez un poste'
                  text={poste || ''}
                  id='poste'
                  error={(errors.length > 0 && errors.find(err => err.code === 'poste')) ? true : false}
                  onChange={(e, {value}) => this.setState({ poste: value})}
                  onFocus={(e) => this.clearInput(e)}
                  options={
                    [
                      {text: 'Ingénieur', value: 'Ingénieur'},
                      {text: 'Technicien', value: 'Technicien'},
                      {text: 'Gardien', value: 'Gardien'}
                    ]
                  }
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
            <Button color='green'>Submit</Button>
          </Form>
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
