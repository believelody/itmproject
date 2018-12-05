import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Message, Segment, Button, Icon } from 'semantic-ui-react';
import { Document, Page, pdfjs } from 'react-pdf';
import './Absence.css';
import sample from "./test.pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

class AbsenceViewer extends Component {
  constructor() {
    super();
    this.state = {
      pageNumber: 1
    }
  }

  componentDidMount() {
    // this.props.fetchAllAbs();
    // this.displayFile('cv_believe_lody_2018.pdf');
  }

  handlePrevious = () => this.setState(prevState => ({ pageNumber: prevState.pageNumber - 1 }));

  handleNext = () => this.setState(prevState => ({ pageNumber: prevState.pageNumber + 1 }));

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  }

  render() {
    const { pageNumber, numPages } = this.state;
    return (
      <Container>
        <Message content='PDF viewer test' />
        <Segment
          textAlign='center'
          compact
          className='segment'
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
            file={sample}
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
      </Container>
    )
  }
}

// AbsenceViewer.propTypes = {
//   abs: PropTypes.object.isRequired
// }
//
// const mapStateToProps = state => ({
//   abs: state.abs
// });

export default AbsenceViewer;
