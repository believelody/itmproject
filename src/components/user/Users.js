import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchAllUsers } from '../../actions/userAction';
import { Table, Button, Input, Alert } from 'reactstrap';
import { UserTable, UserList } from '../Export';

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      toggleTable: true
    };
  }

  componentDidMount() {
    this.props.fetchAllUsers();
  }

  search = ({target}) => this.setState({ search: target.value });

  toggleDisplay = () => this.setState({ toggleTable: !this.state.toggleTable });

  render() {
    const { search, toggleTable } = this.state;
    const { loading, users } = this.props.user;
    return (
      <div>
        {
          !loading &&
          <div>
            <NavLink to='/new-user'>
              <Button color='primary' className='my-3 float-left'>Ajouter un employé </Button>
            </NavLink>
            <Button color='warning' className='my-3 float-right'>Sélection champs</Button>
            <Input type='search' placeholder='Chercher un employé' name='search' onChange={this.search} />
            <Alert color='dark' className='my-2 text-center'>Liste des employés</Alert>
            {
              window.screen.width >= 1024 && <Button className='my-2 float-right' onClick={this.toggleDisplay}>{toggleTable ? 'Liste' : 'Table'}</Button>
            }
            {
              window.screen.width < 1024 && <UserList users={users} search={search} />
            }
            {
              window.screen.width >= 1024 && toggleTable && <UserTable users={users} search={search} />
            }
            {
              window.screen.width >= 1024 && !toggleTable && <UserList users={users} search={search} />
            }
          </div>
        }
      </div>
    );
  }
}

Users.propTypes = {
  user: PropTypes.object.isRequired,
  fetchAllUsers: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps, { fetchAllUsers })(Users);
