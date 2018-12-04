import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, Dropdown } from 'semantic-ui-react';

const AdminHeader = ({handleClick, logout}) =>
<>
  {
    window.screen.width >= 1024 &&
    <>
      <Menu.Item as={NavLink} exact to='/admin' header>
        <b>Projet ITM</b>
      </Menu.Item>

      <Menu.Menu position='right'>
        <Menu.Item as={NavLink} exact to='/statistic' content='Statistique' header />
        <Menu.Item as={NavLink} exact to='/users'>
          <b>Gestion des employés</b>
        </Menu.Item>
        <Menu.Item>
          <Dropdown text='Options'>
            <Dropdown.Menu>
              <Dropdown.Item as={NavLink} exact to='/settings' text='Paramètres' />
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
      <Menu.Item as={NavLink} onClick={() => handleClick(false)} exact to='/admin' header>
        Projet ITM
      </Menu.Item>
      <Menu.Item
        as={NavLink}
        content='Statistique'
        onClick={() => handleClick(false)}
        exact
        to='/statistic'
      />
      <Menu.Item
        as={NavLink}
        content='Gestion des employés'
        onClick={() => handleClick(false)}
        exact
        to='/users'
      />
      <Menu.Item>
        <Menu.Menu>
          <Menu.Item content='Options' header />
          <Menu.Item as={NavLink} onClick={() => handleClick(false)} exact to='/messaging'>
            Messagerie
          </Menu.Item>
          <Menu.Item as={NavLink} onClick={() => handleClick(false)} exact to='/settings'>
            Paramètres
          </Menu.Item>
        </Menu.Menu>
      </Menu.Item>
      <Menu.Item onClick={logout}>
        Se déconnecter
      </Menu.Item>
    </>
  }
</>

export default AdminHeader;
