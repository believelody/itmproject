import React from 'react';
import { NavLink } from 'react-router-dom';
import { Sidebar, Menu, Segment } from 'semantic-ui-react';

const SideNav = ({visible, handleClick, children}) => (
  <Sidebar.Pushable as={Segment}>
    <Sidebar
      as={Menu}
      animation='overlay'
      onHide={() => handleClick(false)}
      vertical
      visible={visible}
      width='thin'
    >
      <Menu.Item as={NavLink} onClick={() => handleClick(false)} exact to='/' header>
        Projet ITM
      </Menu.Item>
      <Menu.Item>
        <Menu.Menu>
          <Menu.Item content='Options' header />
          <Menu.Item as={NavLink} onClick={() => handleClick(false)} exact to='/profile'>
            Mon Profile
          </Menu.Item>
          <Menu.Item as={NavLink} onClick={() => handleClick(false)} exact to='/settings'>
            Paramètres
          </Menu.Item>
        </Menu.Menu>
      </Menu.Item>
      <Menu.Item onClick={() => handleClick(false)}>
        Se déconnecter
      </Menu.Item>
    </Sidebar>
    {children}
  </Sidebar.Pushable>
);

export default SideNav;
