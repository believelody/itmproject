import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteUser } from '../../actions/userAction';
import { Table, Button, Image } from 'semantic-ui-react';
import { ConfirmAction } from '../Export';

class UserTable extends React.Component {
  state = {
    id: null,
    openConfirm: false
  }

  sendID = id => this.setState({ id, openConfirm: true });

  handleConfirmAction = openConfirm => this.setState({ openConfirm });

  render() {
    const { users, search, check } = this.props;
    const { id, openConfirm } = this.state;

    return (
      <div>
        <ConfirmAction
          open={openConfirm}
          id={id}
          action={this.props.deleteUser}
          handleConfirmAction={this.handleConfirmAction}
          header='Suppression'
          content={`Voulez vraiment effectuer cette action? Vous ne pourrez plus revenir en arrière`}
          cancelButton='Annuler'
          confirmButton='Supprimer'
        />
        <Table style={{margin: '0 auto'}} collapsing selectable textAlign='center'>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>#</Table.HeaderCell>
              <Table.HeaderCell>Prénom</Table.HeaderCell>
              <Table.HeaderCell>Nom</Table.HeaderCell>
              {
                !check.email && <Table.HeaderCell>Email</Table.HeaderCell>
              }
              {
                !check.poste && <Table.HeaderCell>Poste</Table.HeaderCell>
              }
              <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {
              users
                .filter(user => user.name.toLowerCase().includes(search))
                .sort((a, b) =>{
                  if (a.name > b.name) return 1;
                  if (a.name < b.name) return -1;
                  return 0;
                })
                .map((user, i) =>
                  <Table.Row key={i}>
                    <Table.Cell>
                      <Image avatar src={user.img || require('../../img/itm_avatar_user_male.png')} />
                    </Table.Cell>
                    <Table.Cell>
                      {
                        user.name.split(' ')[0]
                      }
                    </Table.Cell>
                    <Table.Cell>
                      {
                        user.name.split(' ')[1]
                      }
                    </Table.Cell>
                    {!check.email && <Table.Cell>{user.email}</Table.Cell>}
                    {!check.poste && <Table.Cell>{user.poste}</Table.Cell>}
                    <Table.Cell>
                      <NavLink to={`/user/${user.id}`} className='mr-2'>
                        <Button color="blue">
                          Voir profile
                        </Button>
                      </NavLink>
                      <NavLink to={`/new-user/${user.id}`} className='mr-2'>
                        <Button color="green">
                          Edit
                        </Button>
                      </NavLink>
                      <Button onClick={() => this.sendID(user.id)} color="red">Delete</Button>
                    </Table.Cell>
                  </Table.Row>
                )
            }
          </Table.Body>
        </Table>
      </div>
    );
  }
}

UserTable.propTypes = {
  deleteUser: PropTypes.func.isRequired
}

export default connect(null, { deleteUser })(UserTable);
