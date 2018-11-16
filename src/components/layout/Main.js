import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Container } from 'reactstrap';
import { Users, AddUser, UserDetail } from '../Export';

class Main extends Component {

  render() {
    return (
      <main>
        <Container>
          <Route exact path='/' component={Users} />
          <Route exact path='/new-user' component={AddUser} />
          <Route exact path='/edit-user/:user_id' component={AddUser} />
          <Route exact path='/user/:user_id' component={UserDetail} />
        </Container>
      </main>
    );
  }
}

export default Main;
