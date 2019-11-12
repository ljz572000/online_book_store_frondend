import React,{Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Login from './pages/login/login';
import Admin from './pages/loginadmin/admin';
import User from './pages/loginUser/user';
import ForgotPwd from './pages/forgotAndRegister/forgotpwd';
import Register from './pages/forgotAndRegister/register';

class App extends Component{
  render(){
    return(
      <BrowserRouter>
         <Switch>
         <Route path='/login' component={Login}></Route>
         <Route path='/admin' component={Admin}></Route>
         <Route path='/user' component={User}></Route>
         <Route path='/forgotpwd' component={ForgotPwd}></Route>
         <Route path='/register' component={Register}></Route>
         <Route path='/*' component={User}></Route>
         </Switch>
         </BrowserRouter>
    );
}
}

/**应用的根组件 */
export default App;
