import React, { Component, PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addAd, clearAdFailure, editAd } from '../../actions/adAction';
import { Modal, Button, Form, Message, Input, TextArea } from 'semantic-ui-react';

class NewAd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      text: '',
      visible: false,
      errors: []
    }
  }

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   if (nextProps.selectedAd && (nextProps.selectedAd.title !== prevState.title || nextProps.selectedAd.text !== prevState.text)) {
  //     return {
  //       title: nextProps.selectedAd.title || '',
  //       text: nextProps.selectedAd.text || ''
  //     }
  //   }
  //   if (nextProps.ad && nextProps.ad.errors.length > 0 && nextProps.ad.errors.length !== prevState.errors.length) {
  //     return { errors: nextProps.ad.errors, visible: true };
  //   }
  //   return null;
  // }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedAd) {
      this.setState({
        title: nextProps.selectedAd.title,
        text: nextProps.selectedAd.text
      });
    }
    else {
      this.setState({
        title: '',
        text: ''
      });
    }
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

  open = () => this.props.openModal(true);

  close = () => {
    this.setState({ visible: false, errors: [], title: '', text: '' });
    this.props.clearAdFailure();
    this.props.openModal(false);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { title, text } = this.state;
    const data = { title, text };

    if (this.props.ad.errors.length > 0) {
      this.props.clearAdFailure();
    }

    if (this.props.selectedAd) {
      this.props.editAd(this.props.selectedAd, data)
    }
    else {
      this.props.addAd(data);
    }

    this.setState({
      title: '',
      text: '',
      errors: [],
    });

    if (this.state.title !== '' && this.state. text !== '') this.props.openModal(false);
  }

  render() {
    const { errors, title, text } = this.state;
    const { open, selectedAd } = this.props;
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
          { selectedAd ? 'Edit ad' : 'Add a new ad for your entreprise'}
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
  ad: PropTypes.object.isRequired,
  addAd: PropTypes.func.isRequired,
  editAd: PropTypes.func.isRequired,
  clearAdFailure: PropTypes.func.isRequired
}

const mapStateToProps = state => ({ ad: state.ad });

export default connect(mapStateToProps, { clearAdFailure, addAd, editAd })(NewAd);
