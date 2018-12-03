import React, { Component, PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setAdminRole, clearUserFailure } from '../../actions/userAction';
import { Modal, Button, Form, Message, Input, TextArea } from 'semantic-ui-react';

class NewAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      visible: false,
      errors: []
    }
  }

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
    this.setState({ visible: false, errors: [], email: '' });
    this.props.clearUserFailure();
    this.props.openModal(false);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { email } = this.state;

    if (this.props.user.errors.length > 0) {
      console.log(this.props.errors);
      this.props.clearUserFailure();
    }

    this.props.setAdminRole(this.props.selectedUser, email);

    this.setState({
      email: '',
      errors: [],
    });

    if (this.state.email !== '') this.props.openModal(false);
  }

  render() {
    const { errors, email } = this.state;
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
              error={(errors.length > 0 && errors.find(err => err.code === 'email')) ? true : false}
            >
              <label>Email</label>
              <Input
                name='email'
                type='email'
                onChange={this.handleChange}
                onFocus={this.clearInput}
                value={email}
                placeholder='Indiquer votre email'
              />
              {this.validationFeedBack(errors, 'email')}
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
