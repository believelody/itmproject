import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchOneUser, deleteUser, fetchAvatar } from '../../actions/userAction';
import 'moment/locale/fr';
import moment from 'moment';
import Moment from 'react-moment';
import { Collapse } from 'reactstrap';
import { Card, Dropdown, Button, Image, Icon, Container, Loader } from 'semantic-ui-react';
import { ConfirmAction } from '../Export';
import './User.css';

class UserDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      collapsePresence: false,
      collapseAbsence: false,
      collapse: false,
      id: null,
      openConfirm: false
    };
  }

  componentDidMount() {
    if (this.props.match.params.user_id) {
      this.props.fetchOneUser(this.props.match.params.user_id);
    }

    if (this.props.user.selectedUser && this.props.user.selectedUser.img) {
      console.log(this.props.user.selectedUser);
      this.props.fetchAvatar(this.props.user.selectedUser.id, this.props.user.selectedUser.img);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.selectedUser && nextProps.user.selectedUser.img) {
      console.log(nextProps.user.selectedUser);
      this.props.fetchAvatar(nextProps.user.selectedUser.id, nextProps.user.selectedUser.img);
    }
    console.log(nextProps.user.selectedUser);
  }

  sendID = () => this.setState({ id: this.props.match.params.user_id, openConfirm: true });

  handleConfirmAction = openConfirm => this.setState({ openConfirm });

  toggle = () => this.setState(prevState => ({ isOpen: !prevState.isOpen }));

  toggleCollapsePresence = () => {
    if (this.state.collapseAbsence) {
      this.setState({ collapse: false })
    }
    setTimeout(() =>
      this.setState(prevState => ({
        collapse: !prevState.collapse,
        collapseAbsence: false,
        collapsePresence: !prevState.collapsePresence
      })), 500
    )
  }

  toggleCollapseAbsence = () => {
    if (this.state.collapsePresence) {
      this.setState({ collapse: false })
    }
    setTimeout(() =>
      this.setState(prevState => ({
        collapse: !prevState.collapse,
        collapseAbsence: !prevState.collapseAbsence,
        collapsePresence: false
      })), 500
    )
  }

  render() {
    const { collapseAbsence, collapsePresence, collapse, openConfirm, id } = this.state;
    const { loading, selectedUser, avatar } = this.props.user;
    return (
      <Container>
        <Button onClick={() => this.props.history.goBack()} style={{marginTop: 10}} basic color='black'>Retour à la liste</Button>
        {
          loading && <Loader active inline='centered' size='large' />
        }
        {
          !loading && selectedUser &&
          <div style={{margin: "20px 0"}}>
            <ConfirmAction
              open={openConfirm}
              data={selectedUser}
              action={this.props.deleteUser}
              handleConfirmAction={this.handleConfirmAction}
              header='Suppression'
              content={`Voulez vraiment effectuer cette action? Vous ne pourrez plus revenir en arrière`}
              cancelButton='Annuler'
              confirmButton='Supprimer'
              history={this.props.history}
            />
            <Card centered fluid className='user-detail'>
              <Card.Content>
                <Card.Header>
                  <Dropdown text='Options' className='float-right'>
                    <Dropdown.Menu>
                      <Dropdown.Item
                        as={NavLink}
                        to={`/edit-user/${this.props.match.params.user_id}`}
                        content='Edit'
                      />
                      <Dropdown.Item onClick={this.sendID} content='Supprimer' />
                    </Dropdown.Menu>
                  </Dropdown>
                </Card.Header>
              </Card.Content>
              <Image
                src={avatar || require(selectedUser.sexe === 'Femme' ? '../../img/itm_avatar_user_woman.jpg' : '../../img/itm_avatar_user_male.png')}
                alt={selectedUser.idNFC}
              />
              <Card.Content>
                <Card.Header content={`${selectedUser.prenom} ${selectedUser.nom}`} />
                {
                  selectedUser.naissance &&
                  <Card.Header className='float-right'>
                    <Moment locale='fr' from={selectedUser.naissance} ago />
                  </Card.Header>
                }
                  <Card.Meta>
                  {selectedUser.email}
                </Card.Meta>
                {
                  selectedUser.naissance &&
                  <Card.Meta>
                    {selectedUser.sexe === 'Femme' ? 'Née le' : 'Né le'} <Moment locale='fr' format="DD MMMM YYYY" date={selectedUser.naissance} />
                  </Card.Meta>
                }
                <Card.Description className='d-flex justify-content-around flex-wrap'>
                  <div className='p-2'>Poste: {selectedUser.poste}</div>
                  <div className='p-2'>Absence: 0</div>
                  <div className='p-2'>Cumul heure: 0</div>
                </Card.Description>
                <Card.Description className='d-flex justify-content-around flex-wrap'>
                  <div className='p-2'>Adresse: {selectedUser.adresse} {selectedUser.ville} {selectedUser.cp}</div>
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                {
                  window.screen.width >= 1024 &&
                  <div className='ui three buttons'>
                    <Button basic color='black' className='mx-auto'>Contacter</Button>
                    <Button color='grey' className='mx-1' onClick={(this.toggleCollapsePresence)}>
                      Historique présence
                    </Button>
                    <Button color='grey' className='mx-1' onClick={this.toggleCollapseAbsence}>
                      {'Historique des justificatifs d\'absence'}
                    </Button>
                  </div>
                }
                {
                  window.screen.width < 1024 &&
                  <div className='ui three buttons'>
                    <Button basic color='black' className='mx-auto'>
                      <Icon name="send" /> Contacter
                    </Button>
                    <Button color='grey' className='mx-1' onClick={(this.toggleCollapsePresence)}>
                      <Icon name="history" /> Présence
                    </Button>
                    <Button color='grey' className='mx-1' onClick={this.toggleCollapseAbsence}>
                      <Icon name="history" /> Absence
                    </Button>
                  </div>
                }
              </Card.Content>
            </Card>
            <Collapse isOpen={collapse}>
              {
                collapsePresence &&
                <p>
                  <hr />
                  This is for presence
                </p>
              }
              {
                collapseAbsence &&
                <p>
                  <hr />
                  This is for absence
                </p>
              }
            </Collapse>
            {
              selectedUser.poste === 'gardien' &&
              <div>
                <hr />
                This is for gardien
              </div>
            }
          </div>
        }
      </Container>
    );
  }
}

UserDetail.propTypes = {
  user: PropTypes.object.isRequired,
  fetchOneUser: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  fetchAvatar: PropTypes.func.isRequired
};

// Equivalent to const mapStateToProps = state => ({ user: state.user });
const mapStateToProps = ({user}) => ({user});

export default connect(mapStateToProps, { fetchOneUser, deleteUser, fetchAvatar })(UserDetail);
