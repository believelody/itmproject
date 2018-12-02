import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchAllUsers } from '../../actions/userAction';
import { Container, List, Button, Loader } from 'semantic-ui-react';
import { NewAdmin } from '../Export';
import './AdminSys.css';

class AdminSys extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      selectedUser: null
    };
  }

  componentDidMount() {
    this.props.fetchAllUsers();
  }

  sendID = selectedUser => {
    this.setState({ selectedUser });
    this.openModal(true);
  }

  openModal = open => this.setState({ open });

  render() {
    const { open, active, selectedUser } = this.state;
    const { users, loading } = this.props.user;
    return (
      <Container textAlign='center'>
        {
          loading && <Loader content='Chargement...' />
        }
        {
          !loading && users.length > 0 &&
          <>
            <NewAdmin
              open={open}
              selectedUser={selectedUser}
              openModal={this.openModal}
            />
            <List className="admin-users-list">
              {
                users.map(user =>
                  <List.Item key={user.id}>
                    <List.Content>
                      {user.nom} {user.prenom}
                    </List.Content>
                    <List.Content floated='right'>
                      <Button
                        toggle
                        active={user.role === 'admin'}
                        onClick={() => this.openModal(true)}
                        content={user.role === 'admin' ? 'Admin' : 'User'}
                      />
                    </List.Content>
                  </List.Item>
                )
              }
            </List>
          </>
        }
      </Container>
    );
  }
}

AdminSys.propTypes = {
  user: PropTypes.object.isRequired,
  fetchAllUsers: PropTypes.func.isRequired
}

const mapStateToProps = state => ({ user: state.user });

export default connect(mapStateToProps, { fetchAllUsers })(AdminSys);
