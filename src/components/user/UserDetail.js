import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchOneUser } from '../../actions/userAction';
import {
  Row,
  Col,
  Container,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardHeader,
  CardFooter,
  Button,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Dropdown,
  Collapse
} from 'reactstrap';

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
          <Button outline color='dark' className='my-3'>Retour à la liste</Button>
        </NavLink>
        {
          !loading && selectedUser &&
          <div>
            <Card outline color='dark' className='user-detail mx-auto'>
              <CardHeader>
                <h4 className='float-left text-capitalize'>{selectedUser.name}</h4>
                <Dropdown className='float-right' isOpen={isOpen} toggle={this.toggle}>
                  <DropdownToggle caret>
                    Options
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem>
                      <NavLink to='/new_user'>Edit</NavLink>
                    </DropdownItem>
                    <DropdownItem className='text-danger'>
                      Supprimer
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </CardHeader>
              <CardImg
                top
                width='100%'
                src={selectedUser.img || require('../../img/itm_avatar_user_male.png')}
                alt={selectedUser.name}
              />
              <CardBody>
                <CardSubtitle className='d-flex justify-content-around flex-wrap'>
                  <div className='p-2'>Poste: {selectedUser.poste}</div>
                  <div className='p-2'>Absence: 0</div>
                  <div className='p-2'>Cumul heure: 0</div>
                </CardSubtitle>
                <CardText>
                  {selectedUser.email}
                </CardText>
              </CardBody>
              <CardFooter>
                <Button outline color='dark' className='mx-auto'>Contacter</Button>
                <Button color='light' className='mx-1' onClick={(this.toggleCollapsePresence)}>
                  Historique présence
                </Button>
                <Button color='light' className='mx-1' onClick={this.toggleCollapseAbsence}>
                  {'Historique des justificatifs d\'absence'}
                </Button>
              </CardFooter>
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
