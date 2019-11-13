import React, { Component } from 'react';
import memoryUtils from '../../utils/memoryUtils';
import { Layout } from 'antd';
import './admin.less';
import UserLable from '../../component/label';
import UserHeader from '../../component/header';
import { Redirect, Route, Switch } from 'react-router-dom';
import AdminHome from './adminhome';
import Changebook from './changebook';
const { Header, Footer, Content } = Layout;
class Admin extends Component {
  render() {
    const user = memoryUtils.user;
    if (JSON.stringify(user) === "{}") {
      return <Redirect to='/login' />
    }
    else {
      return (
        <div className="user">
          <UserLable user={user} />
          <Layout className="layout">
            <div className="logo">网上书店</div>
            <Header className="header">
              <UserHeader />
            </Header>
            <Content>
              <Switch>
                <Route path='/admin/home' component={AdminHome} />
                <Route path='/admin/changebook' component={Changebook} />
                <Redirect to={'/admin/home'}></Redirect>
              </Switch>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
            <a  target="_blank" rel="github" href="https://github.com/ljz572000/online_book_store_frondend"> @2019 by 李金洲 李玮光 软件项目实践课程设计项目</a>
            </Footer>
          </Layout>
        </div>
      );
    }
  }
}

export default Admin;
