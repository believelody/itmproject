import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';
import {
  Dashboard,
  Statistics,
  Users,
  AddUser,
  UserDetail,
  ToastNotif,
  AuthRoute,
  Settings,
  Ads,
  Login } from '../Export';

class Main extends Component {

  render() {
    return (
        <Container as='main' style={{border: '1px solid #ccc', borderRadius: 4, margin: '15px auto'}}>
          <ToastNotif />
          <Switch>
            <Route exact path='/login' component={Login} />
            <AuthRoute exact path='/' component={Dashboard} />
            <AuthRoute exact path='/statistic' component={Statistics} />
            <AuthRoute exact path='/users' component={Users} />
            <AuthRoute exact path='/new-user' component={AddUser} />
            <AuthRoute exact path='/edit-user/:user_id' component={AddUser} />
            <AuthRoute exact path='/user/:user_id' component={UserDetail} />
            <AuthRoute exact path='/settings' component={Settings} />
            <AuthRoute exact path='/settings/ads' component={Ads} />
          </Switch>
        </Container>
    );
  }
}

export default Main;
