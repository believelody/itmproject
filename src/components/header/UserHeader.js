import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

const UserHeader = ({handleClick, logout}) =>
<>
  <Menu.Item as={NavLink} onClick={() => handleClick(false)} exact to='/' header>
    Projet ITM
  </Menu.Item>
  <Menu.Item>
    <Menu.Menu>
      <Menu.Item content='Options' header />
      <Menu.Item as={NavLink} onClick={() => handleClick(false)} exact to='/profile'>
        Mon Profile
      </Menu.Item>
      <Menu.Item as={NavLink} onClick={() => handleClick(false)} exact to='/messaging'>
        Messagerie
      </Menu.Item>
    </Menu.Menu>
  </Menu.Item>
  <Menu.Item onClick={logout}>
    Se déconnecter
  </Menu.Item>
</>

export default UserHeader;
