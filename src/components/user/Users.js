import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchAllUsers } from '../../actions/userAction';
// import { Dropdown, DropdownToggle } from 'reactstrap';
import { Button, Input, Header, Checkbox, Loader, Icon, Message, Segment } from 'semantic-ui-react';
import { UserTable, UserList, FilterFields } from '../Export';

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      toggleTable: true,
      filter: false,
      check_email: false,
      check_poste: false,
      avatar: []
    };
  }

  componentDidMount() {
    this.props.fetchAllUsers();
  }

  search = ({target}) => this.setState({ search: target.value });

  toggleDisplay = () => this.setState({ toggleTable: !this.state.toggleTable });

  toggleFilter = () => this.setState(prevState => ({ filter: !prevState.filter }));

  handleCheck = ({target}) =>
    this.setState((prevState) => ({ [target.name]: target.checked }));

  render() {
    const { search, toggleTable, check_email, check_poste } = this.state;
    const { loading, users } = this.props.user;

    return (
      <div>
        {
          loading && <Loader inline='centered' text='Chargement ...' />
        }
        {
          !loading &&
          <div>
            <NavLink to='/new-user'>
              <Button icon='add user' style={{marginTop: 10}} color='blue' content='Ajouté un employé' />
            </NavLink>
            {
              window.screen.width >= 1024 && toggleTable &&
              <Button
                floated='right'
                color='yellow'
                compact
                style={{
                  marginTop: 10,
                  padding: 0
                }}
              >
                <FilterFields
                  check_email={check_email}
                  check_poste={check_poste}
                  handleCheck={this.handleCheck}
                />
              </Button>
            }
            <Input
              style={{marginTop: 10}}
              fluid
              icon='search'
              placeholder='Chercher un employé'
              name='search'
              onChange={this.search}
            />
            <Header content='Liste des employés' textAlign='center' />
            {
              window.screen.width >= 1024 &&
              <Checkbox
                label={toggleTable ? 'Liste' : 'Table'}
                toggle
                style={{marginBottom: 10}}
                floated='right'
                onChange={this.toggleDisplay}
                checked={toggleTable}
              />
            }
            {
              users.length === 0 &&
              <Segment textAlign='center'>
                <Message
                size='large'
                  info
                  header='Liste vide'
                  content={`Aucun employé enregistré dans le base de données. Veuillez en créer un en appuyant sur le bouton: "Ajouté un employé"`}
                />
              </Segment>
            }
            {
              window.screen.width < 1024 && users.length > 0 && <UserList users={users} search={search} />
            }
            {
              window.screen.width >= 1024 && users.length > 0 && toggleTable &&
              <UserTable
                users={users}
                search={search}
                check={{email: check_email, poste: check_poste}}
              />
            }
            {
              window.screen.width >= 1024 && users.length > 0 && !toggleTable &&
              <UserList
                users={users}
                search={search}
              />
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

// <Dropdown
//   direction="left"
//   isOpen={filter}
//   className='my-3 float-right'
//   toggle={this.toggleFilter}
// >
//   <DropdownToggle color='warning' caret>Sélection champs</DropdownToggle>
//   <FilterFields
//     check_email={check_email}
//     check_poste={check_poste}
//     handleCheck={this.handleCheck}
//   />
// </Dropdown>
