import React, { Component } from 'react';
import { Row, Col, Dropdown, Icon, Menu, Avatar } from 'antd';
import storageUtils from '../utils/storageUtils';
import { withRouter } from "react-router-dom";
import './label.less';
class UserLable extends Component {
    logout = ()=>{
        storageUtils.removeUser();
        this.props.history.replace('/login');
    }
    render() {
      const usermenu = (
        <Menu>
          <Menu.Item>
            <div> 姓名: {this.props.user.userName}</div>
            <div> 地址: {this.props.user.address}</div>
            <div> 邮箱: {this.props.user.mail}</div>
            <div> 生日: {this.props.user.birth}</div>
            <a onClick={this.logout} style={{ color: 'red' }}>退出</a>
            <a href="/repair" style={{ color: 'blue' }}>修改个人资料</a>
            <a href = "/repairpwd" style={{color: 'green'}}>修改密码</a>
          </Menu.Item>
        </Menu>
      );
   
      return (
        <div className="user-label">
          <Row gutter={16} type="flex" justify="start">
            <Col span={2} style={{marginLeft: '10px'}}>
              <Dropdown overlay={usermenu}>
                <a href="#">
                  <Avatar src={this.props.user.userIconPath} /> <Icon type="down" />
                </a>
              </Dropdown>
            </Col>
          </Row>
        </div>
      );
    }
  }
export default (withRouter(UserLable));