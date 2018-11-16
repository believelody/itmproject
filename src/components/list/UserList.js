import React from 'react';
import { NavLink } from 'react-router-dom';

// import { Card, Button, CardImg, CardBody, CardTitle, CardText, Alert } from 'reactstrap';
import { Card, Button, Image } from 'semantic-ui-react';
import './UserList.css';

const UserList = ({users, search}) => {
  return (
    <div className='user-list'>
      {
        users
          .filter(user => user.name.toLowerCase().includes(search.toLowerCase()))
          .sort((a, b) =>{
            if (a.name > b.name) return 1;
            if (a.name < b.name) return -1;
            return 0;
          })
          .map((user, i) =>
            <Card className='user-item' key={i}>
              <Image src={user.img || require('../../img/itm_avatar_user_male.png')} />
              <Card.Content>
                <Card.Header>{user.name}</Card.Header>
                <Card.Meta>{user.email}</Card.Meta>
              </Card.Content>
              <Card.Content extra>
                  <NavLink to={`/user/${user.id}`}>
                    <Button basic color='blue'>
                      Voir profile
                    </Button>
                  </NavLink>
                  <NavLink to={`/user/${user.id}`}>
                    <Button basic color='green'>
                      Edit
                    </Button>
                  </NavLink>
                  <Button basic color='red'>
                    Delete
                  </Button>
              </Card.Content>
            </Card>
          )
      }
    </div>
  );
}

export default UserList;
