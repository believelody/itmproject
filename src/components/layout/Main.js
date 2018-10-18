import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Container } from 'reactstrap';
import { Users } from '../Export';

class Main extends Component {

  render() {
    return (
      <main>
        <Container>
          Main Component
          <Route exact path='/' component={Users} />
        </Container>
      </main>
    );
  }
}

export default Main;
