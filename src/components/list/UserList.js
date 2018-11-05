import React from 'react';
import { NavLink } from 'react-router-dom';

import { Card, Button, CardImg, CardBody, CardTitle, CardText, Alert } from 'reactstrap';
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
            <Card className='user-item my-2 mx-1' key={i}>
              <CardImg top widht='100%' src={user.img || require('../../img/itm_avatar_user_male.png')} />
              <CardBody>
                <CardTitle>{user.name}</CardTitle>
                <CardText>{user.email}</CardText>
                <NavLink to={`/user/${user.id}`} className='mr-2'>
                  <Button color='info'>
                    Voir profile
                  </Button>
                </NavLink>
              </CardBody>
            </Card>
          )
      }
    </div>
  );
}

export default UserList;
