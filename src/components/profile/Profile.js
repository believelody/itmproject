import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { authListener } from '../../actions/authAction';
import 'moment/locale/fr';
import moment from 'moment';
import Moment from 'react-moment';
import { Collapse } from 'reactstrap';
import { Card, Dropdown, Button, Image, Icon, Container, Loader, Segment } from 'semantic-ui-react';
import { ConfirmAction } from '../Export';
import './Profile.css';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      collapse: false,
      id: null,
      openConfirm: false
    };
  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {

  }

  toggle = () => this.setState(prevState => ({ isOpen: !prevState.isOpen }));

  render() {
    const { collapse, openConfirm, id } = this.state;
    const { loading, user } = this.props.auth;
    return (
      <Container>
        {
          loading && <Loader active inline='centered' size='large' />
        }
        {
          !loading && user &&
          <>
            <NavLink to={`/deposit/${user.id}`}>
              <Segment compact>
                Déposer un justificatif d'absence
                <span style={{padding: '0 10px'}}></span>
                <Icon name='file pdf' />
              </Segment>
            </NavLink>
            <Card centered fluid className='user-detail'>
              <Image
                src={user.img || require(user.sexe === 'Femme' ? '../../img/itm_avatar_user_woman.jpg' : '../../img/itm_avatar_user_male.png')}
                alt={user.idNFC}
              />
              <Card.Content>
                <Card.Header content={`${user.prenom} ${user.nom}`} />
                {
                  user.naissance &&
                  <Card.Header className='float-right'>
                    <Moment locale='fr' from={user.naissance} ago />
                  </Card.Header>
                }
                  <Card.Meta>
                  {user.email}
                </Card.Meta>
                {
                  user.naissance &&
                  <Card.Meta>
                    {user.sexe === 'Femme' ? 'Née le' : 'Né le'} <Moment locale='fr' format="DD MMMM YYYY" date={user.naissance} />
                  </Card.Meta>
                }
                <Card.Description className='d-flex justify-content-around flex-wrap'>
                  <div className='p-2'>Poste: {user.poste}</div>
                  <div className='p-2'>Absence: 0</div>
                  <div className='p-2'>Cumul heure: 0</div>
                </Card.Description>
                <Card.Description className='d-flex justify-content-around flex-wrap'>
                  <div className='p-2'>Adresse: {user.adresse} {user.ville} {user.cp}</div>
                </Card.Description>
              </Card.Content>
            </Card>
            {
              user.niveau === 'gardien' &&
              <div>
                <hr />
                This is for gardien
              </div>
            }
          </>
        }
      </Container>
    );
  }
}

Profile.propTypes = {
  auth: PropTypes.object.isRequired,
  authListener: PropTypes.func.isRequired
};

// Equivalent to const mapStateToProps = state => ({ user: state.user });
const mapStateToProps = ({auth}) => ({auth});

export default connect(mapStateToProps, { authListener })(Profile);
