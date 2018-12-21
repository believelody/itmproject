import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Card, Button, Image } from 'semantic-ui-react';
import fire from '../../firebaseConfig';

const fireStorage = fire.storage();

class UserListCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar: ''
    };
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
      <Card className='user-item'>
        {avatar && <Image
          src={
            avatar || require(userRow.sexe === 'Femme' ? '../../img/itm_avatar_user_woman.jpg' : '../../img/itm_avatar_user_male.png')
          }
        />}
        <Card.Content>
          <Card.Header>{userRow.prenom} {userRow.nom}</Card.Header>
          <Card.Meta>{userRow.email}</Card.Meta>
        </Card.Content>
        <Card.Content extra>
            <NavLink to={`/user/${userRow.id}`}>
              <Button basic color='blue'>
                Voir profil
              </Button>
            </NavLink>
            <NavLink to={`/edit-user/${userRow.id}`}>
              <Button basic color='green'>
                Edit
              </Button>
            </NavLink>
            <Button onClick={() => sendID(userRow)} basic color='red'>
              Delete
            </Button>
        </Card.Content>
      </Card>
    )
  }
}

export default UserListCard;
