import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchOneUser } from '../../actions/userAction';
import {
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
  Dropdown
} from 'reactstrap';

import './User.css';

class UserDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
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

  render() {
    const { isOpen } = this.state;
    const { loading, selectedUser } = this.props.user;
    return (
      <Container>
        <NavLink to='/'>
          <Button outline color='dark' className='my-3'>Retour à la liste</Button>
        </NavLink>
        {
          !loading && selectedUser &&
          <Card outline color='dark' className='user-detail mx-auto'>
            <CardHeader>
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
            {
              selectedUser.img &&
              <CardImg top width='100%' src={selectedUser.img} alt={selectedUser.name} />
            }
            <CardBody>
              <CardTitle>
                <u className='text-capitalize'>{selectedUser.name}</u>
              </CardTitle>
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
              <Button outline color='dark'>Contacter</Button>
            </CardFooter>
          </Card>
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
