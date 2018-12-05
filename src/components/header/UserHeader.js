import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, Dropdown } from 'semantic-ui-react';

const UserHeader = ({handleClick, logout}) =>
<>
  {
    window.screen.width >= 1024 &&
    <>
      <Menu.Item as={NavLink} exact to='/' header>
        <b>Projet ITM</b>
      </Menu.Item>

      <Menu.Menu position='right'>
        <Menu.Item>
          <Dropdown text='Options'>
            <Dropdown.Menu>
              <Dropdown.Item as={NavLink} exact to='/profile' text='Mon Profile' />
              <Dropdown.Divider />
              <Dropdown.Item as={NavLink} exact to='/messaging' text='Messagerie' />
              <Dropdown.Divider />
              <Dropdown.Item onClick={logout} text='Se déconnecter' />
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
      </Menu.Menu>
    </>
  }
  {
    window.screen.width < 1024 &&
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
  }
</>

export default UserHeader;
