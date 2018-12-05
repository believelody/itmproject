import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';
import {
  UserDashboard,
  AdminDashboard,
  Statistics,
  Users,
  AddUser,
  UserDetail,
  ToastNotif,
  UserRoute,
  AdminRoute,
  Settings,
  Ads,
  AdminSys,
  AbsenceViewer,
  Login } from '../Export';

class Main extends Component {

  render() {
    return (
        <Container as='main' style={{border: '1px solid #ccc', borderRadius: 4, margin: '15px auto'}}>
          <ToastNotif />
          <Switch>
            <Route exact path='/login' component={Login} />
            <UserRoute exact path='/' component={UserDashboard} />
            <AdminRoute exact path='/admin' component={AdminDashboard} />
            <AdminRoute exact path='/statistic' component={Statistics} />
            <AdminRoute exact path='/users' component={Users} />
            <AdminRoute exact path='/new-user' component={AddUser} />
            <AdminRoute exact path='/edit-user/:user_id' component={AddUser} />
            <AdminRoute exact path='/user/:user_id' component={UserDetail} />
            <AdminRoute exact path='/settings' component={Settings} />
            <AdminRoute exact path='/settings/ads' component={Ads} />
            <AdminRoute exact path='/settings/admin-sys' component={AdminSys} />
            <AdminRoute exact path='/settings/absence' component={AbsenceViewer} />
          </Switch>
        </Container>
    );
  }
}

export default Main;
