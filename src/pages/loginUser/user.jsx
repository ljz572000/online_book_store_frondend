import React, { Component } from 'react';
import memoryUtils from '../../utils/memoryUtils';
import './user.less';
import UserLable from '../../component/label';
import { Layout } from 'antd';
import UserHeader from '../../component/header';
import { Redirect,Route,Switch } from 'react-router-dom';
import ShoppingCart from './shopping_cart';
import Home from './home';
import Order from './order';
const { Header, Footer,Content } = Layout;
class User extends Component {
  state = {
    loading: false,
  }
  render() {
    let user = memoryUtils.user;
    if (JSON.stringify(user)==="{}") {
      return <Redirect to='/login'/>
    }
    else {
      if(user.isAdmin){
        return <Redirect to='/admin'/>;
      }else{
        return (
          <div className="user">
            <UserLable user={user} />
            <Layout className="layout">
                      <div className="logo">网上书店</div>
                       <Header className="header">
                       <UserHeader/>
                      </Header>
                      <Content>
                      <Switch>
                              <Route path='/user_home' component={Home} />
                              <Route path='/user_shopping' component={ShoppingCart} />
                              <Route path='/user_order' component={Order} />
                              <Redirect to={'/user_home'}></Redirect>
                          </Switch>
                      </Content>
                      <Footer style={{textAlign: 'center'}}>  @2019 by 李金洲 李玮光 软件项目实践课程设计项目</Footer>
                  </Layout>
          </div>
        );
      }
    
    }
  }
}

export default User;
