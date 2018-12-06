import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { putAbsenceProof, clearUserFailure } from '../../actions/userAction';
import { Form, Button, Input, Message, Icon } from 'semantic-ui-react';
import { AbsenceViewer } from '../Export';

class DepositAbsenceForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: '',
      date: '',
      visible: false,
      errors: [],
      open: false
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



  handleSubmit = (e) => {
    e.preventDefault();
    const { file, date } = this.state;
    const data = { file, date};
    if (this.props.user.errors.length > 0) {
      this.props.clearUserFailure();
    }

    const inputFile = document.querySelector('#inputFile');
    console.log(inputFile.files[0].name);
    this.setState({ file: inputFile.files[0].name, open: true });
    // this.props.putAbsenceProof(this.props.id, data);

    this.setState({
      file: '',
      date: '',
      errors: [],
    });
  }

  render() {
    const { file, date, errors, visible, open } = this.state;
    return (
      <Form onSubmit={this.handleSubmit} noValidate>
        <Form.Field
          error={(errors.length > 0 && errors.find(err => err.code === 'file')) ? true : false}
        >
          <label>
            Fichier
            <span style={{padding: '0 5px'}}></span>
            <Icon name='download' />
          </label>
          <Input
            name='file'
            type='file'
            id='inputFile'
            accept='.pdf'
            onChange={this.handleChange}
            onFocus={this.clearInput}
            value={file}
            placeholder='Sélectionner votre document'
          />
          {this.validationFeedBack(errors, 'file')}
        </Form.Field>
        <Form.Field
          error={(errors.length > 0 && errors.find(err => err.code === 'date')) ? true : false}
        >
          <label>
            Date
            <span style={{padding: '0 5px'}}></span>
            <Icon name='calendar alternate outline' />
          </label>
          <Input
            name='date'
            type='date'
            onChange={this.handleChange}
            onFocus={this.clearInput}
            value={date}
            placeholder='Indiquer le jour de votre absence'
          />
          {this.validationFeedBack(errors, 'date')}
        </Form.Field>
        <Button positive content='Valider' />
        {open && <AbsenceViewer file={file} />}
      </Form>
    )
  }
}

const mapStateToProps = (state) => ({ user: state.user });

export default connect(mapStateToProps, { putAbsenceProof, clearUserFailure })(DepositAbsenceForm);
