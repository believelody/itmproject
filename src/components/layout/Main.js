import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Container } from 'reactstrap';
import { Users, AddUser } from '../Export';

class Main extends Component {

  render() {
    return (
      <main>
        <Container>
          <Route exact path='/' component={Users} />
          <Route exact path='/new-user' component={AddUser} />
        </Container>
      </main>
    );
  }
}

export default Main;
