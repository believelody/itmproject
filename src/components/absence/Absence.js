import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { fetchAllAbsences } from '../../actions/absenceAction';
import { fetchAllUsers } from '../../actions/userAction';
import { Container, List, Loader, Message, Button, Modal, Dimmer } from 'semantic-ui-react';
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

  getUser = id => this.props.user.users.filter(user => user.id === id).map(user => <span key={user.id}>{user.prenom} {user.nom}</span>);

  render() {
    const { open, filename } = this.state;
    const { loading, absences } = this.props.abs;
    const { users } = this.props.user;
    return (
      <Container>
        { loading && <Dimmer active><Loader content='Chargement...' /></Dimmer> }
        {
          !loading && absences.length > 0 &&
          <>
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
                        Absence du: {absence.date}.<br />
                        Nom fichier: <b>{absence.filename}</b>
                        <NavLink to={`/document/viewer/${absence.id}/${absence.filename}`}>
                          <Button
                            floated='right'
                            color='green'
                            content='Consulter le document'
                            inverted
                            icon='search'
                          />
                        </NavLink>
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
  fetchAllUsers: PropTypes.func.isRequired
}

const mapStateToProps = state => ({ abs: state.abs, user: state.user });

export default connect(mapStateToProps, { fetchAllAbsences, fetchAllUsers })(Absence);
