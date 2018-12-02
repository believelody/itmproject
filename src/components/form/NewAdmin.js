import React, { Component, PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setAdminRole, clearUserFailure } from '../../actions/userAction';
import { Modal, Button, Form, Message, Input, TextArea } from 'semantic-ui-react';

class NewAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mdp: '',
      visible: false,
      errors: []
    }
  }

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   if (nextProps.selecteduser && (nextProps.selecteduser.title !== prevState.title || nextProps.selecteduser.mdp !== prevState.mdp)) {
  //     return {
  //       title: nextProps.selecteduser.title || '',
  //       mdp: nextProps.selecteduser.mdp || ''
  //     }
  //   }
  //   if (nextProps.user && nextProps.user.errors.length > 0 && nextProps.user.errors.length !== prevState.errors.length) {
  //     return { errors: nextProps.user.errors, visible: true };
  //   }
  //   return null;
  // }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user && nextProps.user.errors.length > 0) {
      this.setState({ errors: nextProps.user.errors, visible: true });
    }
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

  handleDismiss = (codeLabel) => {
    if (this.state.errors.length > 0) {
      this.setState({ errors: this.state.errors.filter(err => err.code !== codeLabel) });
    }
  }

  handleChange = (e, {name, value}) => this.setState({ [name]: value});

  open = () => this.props.openModal(true);

  close = () => {
    this.setState({ visible: false, errors: [], title: '', mdp: '' });
    this.props.clearuserFailure();
    this.props.openModal(false);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { mdp } = this.state;

    if (this.props.user.errors.length > 0) {
      this.props.clearuserFailure();
    }

    this.props.setAdminRole(this.props.selectedUser, mdp);

    this.setState({
      mdp: '',
      errors: [],
    });

    if (this.state.mdp !== '') this.props.openModal(false);
  }

  render() {
    const { errors, title, mdp } = this.state;
    const { open } = this.props;
    return (
      <Modal
        centered
        open={open}
        dimmer='blurring'
      >
        <Modal.Header>
          Gestion des droits d'administration
          <Button floated='right' negative onClick={this.close} content='Annuler' />
        </Modal.Header>
        <Modal.Content>
          <Form onSubmit={this.handleSubmit} noValidate>
            <Form.Field
              error={(errors.length > 0 && errors.find(err => err.code === 'mdp')) ? true : false}
            >
              <label>Mot de Passe</label>
              <Input
                name='mdp'
                type='password'
                onChange={this.handleChange}
                onFocus={this.clearInput}
                value={title}
                placeholder='Indiquer votre mot de passe'
              />
              {this.validationFeedBack(errors, 'mdp')}
            </Form.Field>
            <Button positive content='Valider' />
          </Form>
        </Modal.Content>
      </Modal>
    )
  }
}

NewAdmin.propTypes = {
  clearUserFailure: PropTypes.func.isRequired,
  setAdminRole: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({ user: state.user });

export default connect(mapStateToProps, { setAdminRole, clearUserFailure })(NewAdmin);
