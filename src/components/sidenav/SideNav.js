import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logout } from '../../actions/authAction';
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
          <Menu.Item as={NavLink} onClick={() => handleClick(false)} exact to='/profile'>
            Mon Profile
          </Menu.Item>
          <Menu.Item as={NavLink} onClick={() => handleClick(false)} exact to='/settings'>
            Paramètres
          </Menu.Item>
        </Menu.Menu>
      </Menu.Item>
      <Menu.Item onClick={() => this.props.logout(handleClick)}>
        Se déconnecter
      </Menu.Item>
    </Sidebar>
    {children}
  </Sidebar.Pushable>
);

SideNav.propTypes = {
  logout: PropTypes.func.isRequired
}

export default connect(null, { logout })(SideNav);
