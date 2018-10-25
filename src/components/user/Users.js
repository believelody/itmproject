import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchAllUsers } from '../../actions/userAction';
import { Table, Button } from 'reactstrap';

class Users extends Component {

  componentDidMount() {
    this.props.fetchAllUsers();
  }

  render() {
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
            <Table hover bordered responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Prénom</th>
                  <th>Nom</th>
                  <th>Email</th>
                  <th>Poste</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {
                  users
                    .sort((a, b) =>{
                      if (a.name > b.name) return 1;
                      if (a.name < b.name) return -1;
                      return 0;
                    })
                    .map((user, i) =>
                      <tr key={i}>
                        <th scope='row'>{i + 1}</th>
                        <td>{user.name.split(' ')[0]}</td>
                        <td>{user.name.split(' ')[1]}</td>
                        <td>{user.email}</td>
                        <td>{user.poste}</td>
                        <td>
                          <NavLink to={`/user`} className='mr-2'>
                            <Button color='success'>
                              Edit
                            </Button>
                          </NavLink>
                          <Button color='danger'>Delete</Button>
                        </td>
                      </tr>
                    )
                }
              </tbody>
            </Table>
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
