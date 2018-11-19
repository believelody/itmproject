import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { register, login, clearAuthFailure } from '../../actions/authAction';
import { Form, Input, Button, Message, Segment, Header } from 'semantic-ui-react';
import './Login.css';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: [],
      visible: false
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth && nextProps.auth.errors.length > 0) {
      this.setState({ errors: nextProps.auth.errors, visible: true });
    }
  }

  handleChange = ({target}) => this.setState({ [target.name]: target.value });

  handleDismiss = (codeLabel) => {
    if (this.state.errors.length > 0) {
      this.setState({ errors: this.state.errors.filter(err => err.code !== codeLabel) });
    }
  }

  handleSubmit = () => {
    const { email, password, errors } = this.state;
    const data = { email, password };

    if (this.props.auth.errors.length > 0) {
      this.props.clearAuthFailure();
    }

    this.props.login(data);

    this.setState({
      email: errors.find(err => err.code === 'email') ? '' : email,
      password: errors.find(err => err.code === 'password') ? '' : password,
      errors: []
    })
  }

  clearInput = ({target}) => {
    if (this.state.errors.length > 0) {
      this.setState({ errors: this.state.errors.filter(err => err.code !== target.name) });
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
    const { email, password, errors } = this.state;
    return (
      <div className='wrapper'>
        <Segment textAlign='center'>
          <Header as='h2' content='Connectez-vous' />
        </Segment>
        <Segment textAlign='center' className='login'>
          <Form onSubmit={this.handleSubmit} noValidate>
            <Form.Group style={{paddingBottom: 20}}>
              <Form.Field
                width={16}
                error={(errors.length > 0 && errors.find(err => err.code === 'email')) ? true : false}
              >
                <label>Email</label>
                <Input
                  name='email'
                  type='text'
                  value={email}
                  onChange={this.handleChange}
                  onFocus={this.clearInput}
                  placeholder='exemple: john@doe.com'
                  required
                />
                { this.validationFeedBack(errors, 'email') }
              </Form.Field>
            </Form.Group>

            <Form.Group style={{paddingBottom: 20}}>
              <Form.Field
                width={16}
                error={(errors.length > 0 && errors.find(err => err.code === 'password')) ? true : false}
              >
                <label>Mot de passe</label>
                <Input
                  name='password'
                  type='password'
                  value={password}
                  onChange={this.handleChange}
                  onFocus={this.clearInput}
                  placeholder='Entrez votre mot de passe'
                  required
                />
                { this.validationFeedBack(errors, 'password') }
              </Form.Field>
            </Form.Group>
            <Button color='vk' content='Se connecter' />
            { this.validationFeedBack(errors, 'authentification') }
          </Form>
        </Segment>
      </div>
    )
  }
}

Login.propTypes = {
  auth: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  clearAuthFailure: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({ auth: state.auth });

export default connect(mapStateToProps, { register, login, clearAuthFailure })(Login);
