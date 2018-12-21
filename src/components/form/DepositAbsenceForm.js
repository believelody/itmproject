import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { putAbsenceProof, clearUserFailure } from '../../actions/userAction';
import { Form, Button, Input, Message, Icon, Image, Segment } from 'semantic-ui-react';
import { Document, Page, pdfjs } from 'react-pdf';
import { DocumentViewer } from '../Export';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

class DepositAbsenceForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNumber: 1,
      preview: '',
      file: {},
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

  handleChange = (e, {name, value}) => {
    if (e.target.id) {
      console.log(e.target.files[0]);
      this.setState({
        preview: URL.createObjectURL(e.target.files[0]),
        file: e.target.files[0],
        open: true
      });
    }
    else {
      this.setState({ [name]: value});
    }
  }

  handlePrevious = () => this.setState(prevState => ({ pageNumber: prevState.pageNumber - 1 }));

  handleNext = () => this.setState(prevState => ({ pageNumber: prevState.pageNumber + 1 }));

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { file, date } = this.state;
    const data = { file, date};
    if (this.props.user.errors.length > 0) {
      this.props.clearUserFailure();
    }
    this.props.putAbsenceProof(this.props.id, data);

    this.setState({
      preview: '',
      file: {},
      date: '',
      open: false,
      errors: [],
    });
  }

  render() {
    const { preview, date, errors, visible, open, pageNumber, numPages } = this.state;
    return (
      <Form onSubmit={this.handleSubmit} noValidate>
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
            accept='application/pdf'
            multiple
            onChange={this.handleChange}
            onFocus={this.clearInput}
            placeholder='Sélectionner votre document'
          />
          {this.validationFeedBack(errors, 'file')}
        </Form.Field>
        {
          preview &&
          <>
            <Message
              content="Pour confirmer l'envoi du document, cliquer sur le bouton <<Enregistrer ci-bas>>"
              header="Visualisation de votre document"
            />
            <Segment
              textAlign='center'
              compact
              className='segment-style'
              padded='very'
            >
              <div style={{paddingBottom: 10, width: '100%'}}>
                <Button onClick={this.handlePrevious} disabled={pageNumber === 1}>
                  <Icon name='arrow left' />
                  Précédent
                </Button>
                <span style={{padding: '0 50px'}}>{ pageNumber } / { numPages }</span>
                <Button onClick={this.handleNext} disabled={pageNumber === numPages}>
                  Suivant
                  <Icon name='arrow right' />
                </Button>
              </div>
              <Document
                file={preview}
                className='document'
                onLoadSuccess={this.onDocumentLoadSuccess}
              >
                <Page
                  pageNumber={pageNumber}
                />
              </Document>
              <div style={{paddingTop: 10}}>
                <Button onClick={this.handlePrevious} disabled={pageNumber === 1}>
                  <Icon name='arrow left' />
                  Précédent
                </Button>
                <span style={{padding: '0 50px'}}>{ pageNumber } / { numPages }</span>
                <Button onClick={this.handleNext} disabled={pageNumber === numPages}>
                  Suivant
                  <Icon name='arrow right' />
                </Button>
              </div>
            </Segment>
          </>
        }
        <Button type='submit' positive content='Enregistrer' />
      </Form>
    )
  }
}

const mapStateToProps = (state) => ({ user: state.user });

export default connect(mapStateToProps, { putAbsenceProof, clearUserFailure })(DepositAbsenceForm);
