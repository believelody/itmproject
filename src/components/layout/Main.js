import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Container } from 'reactstrap';
import { Dashboard, Statistics, Users, AddUser, UserDetail } from '../Export';

class Main extends Component {

  render() {
    return (
      <main>
        <Container style={{border: '1px solid #ccc', borderRadius: 4, margin: '15px auto'}}>
          <Route exact path='/' component={Dashboard} />
          <Route exact path='/statistic' component={Statistics} />
          <Route exact path='/users' component={Users} />
          <Route exact path='/new-user' component={AddUser} />
          <Route exact path='/edit-user/:user_id' component={AddUser} />
          <Route exact path='/user/:user_id' component={UserDetail} />
        </Container>
      </main>
    );
  }
}

export default Main;
