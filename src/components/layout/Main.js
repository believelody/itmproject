import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';
import { Dashboard, Statistics, Users, AddUser, UserDetail, ToastNotif, AuthRoute, Login } from '../Export';

class Main extends Component {

  render() {
    return (
        <Container as='main' style={{border: '1px solid #ccc', borderRadius: 4, margin: '15px auto'}}>
          <ToastNotif />
          <Switch>
            <Route exact path='/login' component={Login} />
            <AuthRoute exact path='/' component={Dashboard} />
            <AuthRoute path='/statistic' component={Statistics} />
            <AuthRoute path='/users' component={Users} />
            <AuthRoute path='/new-user' component={AddUser} />
            <AuthRoute path='/edit-user/:user_id' component={AddUser} />
            <AuthRoute path='/user/:user_id' component={UserDetail} />
          </Switch>
        </Container>
    );
  }
}

export default Main;
