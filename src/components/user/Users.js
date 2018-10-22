import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchAllUsers } from '../../actions/userAction';
import { Table, Button } from 'reactstrap';

class Users extends Component {
  componentDidMount() {
    this.props.fetchAllUsers();
  }

  addEmployee = () => {
    console.log('test');
  }

  render() {
    const { loading, users } = this.props.user;
    // console.log(this.props.user);
    return (
      <div>
        {
          !loading &&
          <div>
            <Button onClick={this.addEmployee} color='primary'>Add an employee + </Button>
            <Table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Prénom</th>
                  <th>Nom</th>
                  <th>Email</th>
                  <th>Poste</th>
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
