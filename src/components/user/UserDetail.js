import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchOneUser } from '../../actions/userAction';
import {
  // Row,
  // Col,
  // Container,
  // Card,
  // CardImg,
  // CardText,
  // CardBody,
  // CardTitle,
  // CardSubtitle,
  // CardHeader,
  // CardFooter,
  // Button,
  // DropdownItem,
  // DropdownMenu,
  // DropdownToggle,
  // Dropdown,
  Collapse
} from 'reactstrap';

import { Card, Dropdown, Button, Image, Accordion, Icon, Container, Loader } from 'semantic-ui-react';

import './User.css';

class UserDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      collapsePresence: false,
      collapseAbsence: false,
      collapse: false
    };
  }
  componentDidMount() {
    if (this.props.match.params.user_id) {
      this.props.fetchOneUser(this.props.match.params.user_id);
    }
  }

  componentWillReceiveProps(nextProps) {

  }

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
    const { isOpen, collapseAbsence, collapsePresence, collapse } = this.state;
    const { loading, selectedUser } = this.props.user;
    return (
      <Container>
        <NavLink to='/'>
          <Button style={{marginTop: 10}} basic color='black'>Retour à la liste</Button>
        </NavLink>
        {
          loading && <Loader active inline='centered' size='large' />
        }
        {
          !loading && selectedUser &&
          <div style={{margin: "20px 0"}}>
            <Card centered fluid className='user-detail'>
              <Card.Content>
                <Card.Header>
                  <Dropdown text='Options' className='float-right'>
                    <Dropdown.Menu>
                      <Dropdown.Item>
                        <NavLink to='/new_user'>Edit</NavLink>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        Supprimer
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Card.Header>
              </Card.Content>
              <Image
                src={selectedUser.img || require('../../img/itm_avatar_user_male.png')}
                alt={selectedUser.name}
              />
              <Card.Content>
                <Card.Header content={selectedUser.name} />
                <Card.Meta>
                  {selectedUser.email}
                </Card.Meta>
                <Card.Description className='d-flex justify-content-around flex-wrap'>
                  <div className='p-2'>Poste: {selectedUser.poste}</div>
                  <div className='p-2'>Absence: 0</div>
                  <div className='p-2'>Cumul heure: 0</div>
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <div className='ui three buttons'>
                  <Button basic color='black' className='mx-auto'>Contacter</Button>
                  <Button color='grey' className='mx-1' onClick={(this.toggleCollapsePresence)}>
                    Historique présence
                  </Button>
                  <Button color='grey' className='mx-1' onClick={this.toggleCollapseAbsence}>
                    {'Historique des justificatifs d\'absence'}
                  </Button>
                </div>
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
  fetchOneUser: PropTypes.func.isRequired
};

// Equivalent to const mapStateToProps = state => ({ user: state.user });
const mapStateToProps = ({user}) => ({user});

export default connect(mapStateToProps, { fetchOneUser })(UserDetail);
