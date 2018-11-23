import React from 'react';
import { connect } from 'react-redux';
import { HeaderDesktop, HeaderMobile } from '../Export';

import './Layout.css'

// const headerStyle = {
//   position: 'absolute',
//   top: 0,
//   width: '500px',
//   height: '70px',
//   zIndex: 1,
//   padding: '0 20px',
//   background: 'rgba(0, 0, 0, .4)',
//   borderRadius: '4px'
// }

const Header = ({handleClick, auth}) => auth.isAuthenticated &&
  <div className='header-style gradient-background'>
    {
      window.screen.width >= 1024 && <HeaderDesktop />
    }
    {
      window.screen.width < 1024 && <HeaderMobile handleClick={handleClick} />
    }
  </div>

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, {})(Header);
