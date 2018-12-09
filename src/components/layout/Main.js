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
  Absence,
  Profile,
  Deposit,
  DocumentViewer,
  UserAbsencePanel,
  Login } from '../Export';
import './Layout.css';

class Main extends Component {

  render() {
    return (
        <Container as='main' className='main-style'>
          <ToastNotif />
          <Switch>
            <Route exact path='/login' component={Login} />
            <Route exact path='/document/viewer/:document_id/:document_name' component={DocumentViewer} />
            <UserRoute exact path='/' component={UserDashboard} />
            <UserRoute exact path='/profile' component={Profile} />
            <UserRoute exact path='/deposit/:id' component={Deposit} />
            <UserRoute exact path='/absence/list' component={UserAbsencePanel} />
            <AdminRoute exact path='/admin' component={AdminDashboard} />
            <AdminRoute exact path='/statistic' component={Statistics} />
            <AdminRoute exact path='/users' component={Users} />
            <AdminRoute exact path='/new-user' component={AddUser} />
            <AdminRoute exact path='/edit-user/:user_id' component={AddUser} />
            <AdminRoute exact path='/user/:user_id' component={UserDetail} />
            <AdminRoute exact path='/settings' component={Settings} />
            <AdminRoute exact path='/settings/ads' component={Ads} />
            <AdminRoute exact path='/settings/admin-sys' component={AdminSys} />
            <AdminRoute exact path='/settings/absence' component={Absence} />
          </Switch>
        </Container>
    );
  }
}

export default Main;
