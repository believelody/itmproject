import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logout } from '../../actions/authAction';
import { Menu, Dropdown } from 'semantic-ui-react';
import { AdminHeader, UserHeader } from '../Export';

const HeaderDesktop = ({logout, auth}) => {
  console.log(auth);
  return (
  <Menu style={{background: 'transparent', height: '100%'}}>
    {
      auth.user && auth.user.role === 'admin' &&
      <AdminHeader logout={logout} />
    }
    {
      auth.user && auth.user.role === 'user' &&
      <UserHeader logout={logout} />
    }
  </Menu>);
}

HeaderDesktop.propTypes = {
  logout: PropTypes.func.isRequired
}

const mapStateToProps = state => ({ auth: state.auth });

export default connect(mapStateToProps, { logout })(HeaderDesktop);
