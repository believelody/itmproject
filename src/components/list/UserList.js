import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteUser } from '../../actions/userAction';

// import { Card, Button, CardImg, CardBody, CardTitle, CardText, Alert } from 'reactstrap';
import { Card, Button, Image } from 'semantic-ui-react';
import { ConfirmAction } from '../Export';
import './UserList.css';

class UserList extends React.Component {
  state = {
    user: null,
    openConfirm: false
  }

  sendID = user => this.setState({ user, openConfirm: true });

  handleConfirmAction = openConfirm => this.setState({ openConfirm });

  render() {
    const {users, search} = this.props;
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
        <div className='user-list'>
          {
            users
              .filter(user => user.prenom.toLowerCase().includes(search.toLowerCase()) || user.nom.toLowerCase().includes(search.toLowerCase()))
              .sort((a, b) =>{
                if (a.nom > b.nom) return 1;
                if (a.nom < b.nom) return -1;
                return 0;
              })
              .map((user, i) =>
                <Card className='user-item' key={i}>
                  <Image src={user.img || require(user.sexe === 'Femme' ? '../../img/itm_avatar_user_woman.jpg' : '../../img/itm_avatar_user_male.png')} />
                  <Card.Content>
                    <Card.Header>{user.prenom} {user.nom}</Card.Header>
                    <Card.Meta>{user.email}</Card.Meta>
                  </Card.Content>
                  <Card.Content extra>
                      <NavLink to={`/user/${user.id}`}>
                        <Button basic color='blue'>
                          Voir profile
                        </Button>
                      </NavLink>
                      <NavLink to={`/edit-user/${user.id}`}>
                        <Button basic color='green'>
                          Edit
                        </Button>
                      </NavLink>
                      <Button onClick={() => this.sendID(user)} basic color='red'>
                        Delete
                      </Button>
                  </Card.Content>
                </Card>
              )
          }
        </div>
      </div>
    );
  }
}

UserList.propTypes = {
  deleteUser: PropTypes.func.isRequired
}

export default connect(null, { deleteUser })(UserList);
