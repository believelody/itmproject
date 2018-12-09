import React, { Component } from 'react';
import { Navlink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchOneDocument } from '../../actions/absenceAction';
import { Container, Message, Segment, Button, Icon, Loader } from 'semantic-ui-react';
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

  componentDidMount() {
    const { document_id, document_name} = this.props.match.params;
    if (document_id && document_name) {
      console.log({document_name, document_id});
      this.props.fetchOneDocument(document_id, document_name);
    }
  }

  handlePrevious = () => this.setState(prevState => ({ pageNumber: prevState.pageNumber - 1 }));

  handleNext = () => this.setState(prevState => ({ pageNumber: prevState.pageNumber + 1 }));

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  }

  render() {
    const { pageNumber, numPages } = this.state;
    const { loading, documentSelected } = this.props.abs;
    return (
      <div>
        <Button
          color='grey'
          icon='arrow left'
          content='Revenir en arrière'
          onClick={() => this.props.history.goBack()}
        />
        {
          loading && <Loader active content='Chargement' />
        }
        {
          !loading && documentSelected &&
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
              file={documentSelected}
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
      </div>
    )
  }
}

DocumentViewer.propTypes = {
  abs: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  abs: state.abs
});

export default connect(mapStateToProps, { fetchOneDocument })(DocumentViewer);
