import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addAd, clearAdFailure } from '../../actions/adAction';
import { Modal, Button, Form, Message, Input, TextArea } from 'semantic-ui-react';

class NewAd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      title: '',
      text: '',
      visible: false,
      errors: []
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.ad && nextProps.ad.errors.length > 0) {
      this.setState({ errors: nextProps.ad.errors, visible: true });
    }
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

  handleDismiss = (codeLabel) => {
    if (this.state.errors.length > 0) {
      this.setState({ errors: this.state.errors.filter(err => err.code !== codeLabel) });
    }
  }

  handleChange = (e, {name, value}) => this.setState({ [name]: value});

  open = () => this.setState({ open: true });

  close = () => this.setState({ open: false, visible: false, errors: [] });

  handleSubmit = (e) => {
    e.preventDefault();
    const { title, text } = this.state;
    const data = { title, text };

    if (this.props.ad.errors.length > 0) {
      this.props.clearAdFailure();
    }

    this.props.addAd(data);

    this.setState({
      title: '',
      text: '',
      errors: [],
      open: (this.state.title === '' && this.state.text === '') ? true : false
    });
  }

  render() {
    const { errors, open, title, text } = this.state;
    return (
      <Modal
        trigger={
          <Button
            icon='plus'
            content='Ajouter une annonce'
            onClick={this.open}
          />
        }
        centered
        open={open}
        dimmer='blurring'
      >
        <Modal.Header>
          Add a new ad for your entreprise
          <Button floated='right' negative onClick={this.close} content='Annuler' />
        </Modal.Header>
        <Modal.Content>
          <Form onSubmit={this.handleSubmit} noValidate>
            <Form.Field
              error={(errors.length > 0 && errors.find(err => err.code === 'title')) ? true : false}
            >
              <label>Titre</label>
              <Input
                name='title'
                onChange={this.handleChange}
                onFocus={this.clearInput}
                value={title}
                placeholder='Donnez un titre à votre annonce'
              />
              {this.validationFeedBack(errors, 'title')}
            </Form.Field>
            <Form.Field
              error={(errors.length > 0 && errors.find(err => err.code === 'text')) ? true : false}
            >
              <label>Contenu de l'annoce</label>
              <TextArea
                name='text'
                onChange={this.handleChange}
                onFocus={this.clearInput}
                value={text}
                placeholder="Décrivez l'annonce"
              />
              {this.validationFeedBack(errors, 'text')}
            </Form.Field>
            <Button positive content='Valider' />
          </Form>
        </Modal.Content>
      </Modal>
    )
  }
}

NewAd.propTypes = {
  addAd: PropTypes.func.isRequired,
  clearAdFailure: PropTypes.func.isRequired
}

const mapStateToProps = state => ({ ad: state.ad });

export default connect(mapStateToProps, { clearAdFailure, addAd })(NewAd);
