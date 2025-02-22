import React, { Component } from 'react';
// import {BrowserRouter, Route, Switch} from 'react-router-dom';
import { HashRouter, Route, Switch } from 'react-router-dom'
import Login from './pages/login/login';
import Admin from './pages/loginadmin/admin';
import User from './pages/loginUser/user';
import ForgotPwd from './pages/forgotAndRegister/forgotpwd';
import Register from './pages/forgotAndRegister/register';
import Repair from './pages/forgotAndRegister/repair';
import RepairPwd from './pages/forgotAndRegister/repairpwd';
import Money from './pages/money';
export default class App extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
        <Route path='/forgotpwd' component={ForgotPwd}></Route>
          <Route path='/register' component={Register}></Route>
          <Route path='/repair' component={Repair}></Route>
          <Route path='/repairpwd' component={RepairPwd}></Route>
          <Route path='/login' component={Login}></Route>
          <Route path='/admin' component={Admin}></Route>
          <Route path='/user' component={User}></Route>
          <Route path='/money' component={Money}></Route>
          <Route path='/' component={User}></Route>
        </Switch>
      </HashRouter>
    );
  }
}
