import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Table, Button, Image, Icon } from 'semantic-ui-react';
import fire from '../../firebaseConfig';

const fireStorage = fire.storage();

class UserRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar: ''
    }
  }

  componentDidMount() {
    if (this.props.userRow.img) {
      const documentFetch = fireStorage.ref().child(`avatar/${this.props.userRow.id}/${this.props.userRow.img}`);

      documentFetch.getDownloadURL().then(avatar => this.setState({ avatar }));
    }
  }

  render() {
    const { avatar } = this.state;
    const { userRow, sendID, check } = this.props;
    return (
      <Table.Row>
        <Table.Cell>
          <Image avatar src={avatar || require(userRow.sexe === 'Femme' ? '../../img/itm_avatar_user_woman.jpg' : '../../img/itm_avatar_user_male.png')} />
        </Table.Cell>
        <Table.Cell>
          {
            userRow.prenom
          }
        </Table.Cell>
        <Table.Cell>
          {
            userRow.nom
          }
        </Table.Cell>
        {!check.email && <Table.Cell>{userRow.email}</Table.Cell>}
        {!check.poste && <Table.Cell>{userRow.poste}</Table.Cell>}
        <Table.Cell>
          <NavLink to={`/user/${userRow.id}`} className='mr-2'>
            <Button color="blue" content='Voir profile' />
          </NavLink>
          <NavLink to={`/edit-user/${userRow.id}`} className='mr-2'>
            <Button color="green">
              Edit
            </Button>
          </NavLink>
          <Button onClick={() => sendID(userRow)} color="red">Delete</Button>
        </Table.Cell>
      </Table.Row>
    )
  }
}

export default UserRow;
