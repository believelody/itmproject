import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteUser } from '../../actions/userAction';
import { Table, Button, Image, Icon } from 'semantic-ui-react';
import { ConfirmAction } from '../Export';

class UserTable extends React.Component {
  state = {
    user: null,
    openConfirm: false
  }

  sendID = user => this.setState({ user, openConfirm: true });

  handleConfirmAction = openConfirm => this.setState({ openConfirm });

  render() {
    const { users, search, check } = this.props;
    const { user, openConfirm } = this.state;

    return (
      <div>
        <ConfirmAction
          open={openConfirm}
          data={user}
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
                .filter(user => user.prenom.toLowerCase().includes(search) || user.nom.toLowerCase().includes(search))
                .sort((a, b) =>{
                  if (a.nom > b.nom) return 1;
                  if (a.nom < b.nom) return -1;
                  return 0;
                })
                .map((user, i) =>
                  <Table.Row key={i}>
                    <Table.Cell>
                      <Image avatar src={user.img || require(user.sexe === 'Femme' ? '../../img/itm_avatar_user_woman.jpg' : '../../img/itm_avatar_user_male.png')} />
                    </Table.Cell>
                    <Table.Cell>
                      {
                        user.prenom
                      }
                    </Table.Cell>
                    <Table.Cell>
                      {
                        user.nom
                      }
                    </Table.Cell>
                    {!check.email && <Table.Cell>{user.email}</Table.Cell>}
                    {!check.poste && <Table.Cell>{user.poste}</Table.Cell>}
                    <Table.Cell>
                      <NavLink to={`/user/${user.id}`} className='mr-2'>
                        <Button color="blue" content='Voir profile' />
                      </NavLink>
                      <NavLink to={`/edit-user/${user.id}`} className='mr-2'>
                        <Button color="green">
                          Edit
                        </Button>
                      </NavLink>
                      <Button onClick={() => this.sendID(user)} color="red">Delete</Button>
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
