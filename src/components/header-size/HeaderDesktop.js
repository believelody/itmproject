import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, Dropdown } from 'semantic-ui-react'

const HeaderDesktop = () =>
  <Menu style={{background: 'transparent', height: '100%'}}>
    <Menu.Item as={NavLink} exact to='/' header>
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
            <Dropdown.Item as={NavLink} exact to='/profile' text='Mon profile' />
            <Dropdown.Item as={NavLink} exact to='/settings' text='Paramètres' />
            <Dropdown.Divider />
            <Dropdown.Item text='Se déconnecter' />
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Item>
    </Menu.Menu>
  </Menu>

export default HeaderDesktop;
