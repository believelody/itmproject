import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Message, Segment, Button, Icon } from 'semantic-ui-react';
import { Document, Page, pdfjs } from 'react-pdf';
import './Document.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

class DocumentViewer extends Component {
  constructor() {
    super();
    this.state = {
      pageNumber: 1
    }
  }

  handlePrevious = () => this.setState(prevState => ({ pageNumber: prevState.pageNumber - 1 }));

  handleNext = () => this.setState(prevState => ({ pageNumber: prevState.pageNumber + 1 }));

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  }

  render() {
    const { pageNumber, numPages } = this.state;
    const { file } = this.props;
    return (
      <>
        {
          file &&
          <Segment
            textAlign='center'
            compact
            className='segment-style'
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
              file={{url: file, httpHeaders: {"Access-Control-Allow-Origin" : "*"}}}
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
        }
      </>
    )
  }
}

// DocumentViewer.propTypes = {
//   abs: PropTypes.object.isRequired
// }
//
// const mapStateToProps = state => ({
//   abs: state.abs
// });

export default DocumentViewer;
