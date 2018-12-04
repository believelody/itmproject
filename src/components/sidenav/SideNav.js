import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logout } from '../../actions/authAction';
import { Sidebar, Menu, Segment } from 'semantic-ui-react';
import { AdminHeader, UserHeader } from '../Export';

const SideNav = ({visible, handleClick, children, logout, user}) => (
  <Sidebar.Pushable as={Segment}>
    <Sidebar
      as={Menu}
      animation='overlay'
      onHide={() => handleClick(false)}
      vertical
      visible={visible}
      width='thin'
    >
      {
        console.log(user)
      }
    </Sidebar>
    {children}
  </Sidebar.Pushable>
);

SideNav.propTypes = {
  logout: PropTypes.func.isRequired
}

const mapStateToProps = state => ({ user: state.user });

export default connect(mapStateToProps, { logout })(SideNav);
