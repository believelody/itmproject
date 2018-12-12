import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteUser } from '../../actions/userAction';
import { Table } from 'semantic-ui-react';
import { ConfirmAction, UserRow } from '../Export';

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
    // console.log(users);
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
                .map(user =>
                  <UserRow key={user.id} sendID={this.sendID} check={check} userRow={user} />
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
