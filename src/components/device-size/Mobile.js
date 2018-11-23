import React from 'react';
import { connect } from 'react-redux';
import { Sidebar } from 'semantic-ui-react';
import { Main, Footer, SideNav, Header } from '../Export';

const Mobile = ({visible, handleClick}) => (
  <SideNav visible={visible} handleClick={handleClick}>
    <Sidebar.Pusher dimmed={visible}>
      <Header handleClick={handleClick} />
      <Main />
      <Footer />
    </Sidebar.Pusher>
  </SideNav>
);

export default Mobile;
