import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { fetchAllAbsences, fetchOneDocument } from '../../actions/absenceAction';
import { fetchAllUsers } from '../../actions/userAction';
import { Container, List, Loader, Message, Button, Modal, Dimmer } from 'semantic-ui-react';
import { DocumentViewer } from '../Export';
import './Absence.css';

class Absence extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.fetchAllAbsences();
    this.props.fetchAllUsers();
  }

  previewDocument = document => {
    this.props.fetchOneDocument(document);
    this.setState({ filename: document.filename, open: true });
  }

  // openModal = open => this.setState({ open: true });

  closeModal = open => this.setState({ open: false });

  getUser = id => this.props.user.users.filter(user => user.id === id).map(user => <span key={user.id}>{user.prenom} {user.nom}</span>);

  render() {
    const { open, filename } = this.state;
    const { loading, absences, documentSelected } = this.props.abs;
    const { users } = this.props.user;
    // console.log(absences);
    return (
      <Container>
        { loading && <Dimmer active><Loader content='Chargement...' /></Dimmer> }
        {
          !loading && absences.length > 0 &&
          <>
            {
              open && documentSelected &&
              <Modal
                centered
                open={open}
                dimmer='blurring'
              >
                <Modal.Header>
                  Visualisation du document <i style={{color: 'grey'}}>{filename}</i>
                  <Button
                    floated='right'
                    negative
                    content='Annuler'
                    onClick={() => this.closeModal(false)}
                  />
                </Modal.Header>
                <Modal.Content>
                  <DocumentViewer file={documentSelected} />
                </Modal.Content>
              </Modal>
            }
            <List divided>
              <Message>
                <Message.Header content="Consultation des justificatifs d'absence" />
                <Message.Content content="Vous trouverez ci-dessous tous les employés ayant déposé un (des) justificatif(s)" />
              </Message>
              {
                absences
                  .map(absence =>
                  <List.Item key={absence.id}>
                    <List.Content>
                      <List.Header>{this.getUser(absence.user_id)}</List.Header>
                      <List.Description>
                        <b>{absence.filename}</b> déposé le {absence.date}
                        <Button onClick={() => this.previewDocument(absence)} floated='right' color='green' content='Consulter le document' inverted icon='search' />
                      </List.Description>
                    </List.Content>
                  </List.Item>
                )
              }
            </List>
          </>
        }
      </Container>
    )
  }
}

Absence.propTypes = {
  abs: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  fetchAllAbsences: PropTypes.func.isRequired,
  fetchAllUsers: PropTypes.func.isRequired,
  fetchOneDocument: PropTypes.func.isRequired
}

const mapStateToProps = state => ({ abs: state.abs, user: state.user });

export default connect(mapStateToProps, { fetchAllAbsences, fetchAllUsers, fetchOneDocument })(Absence);
