import React, { Component } from 'react';
import { Row, Col, Dropdown, Icon, Menu, Avatar, Upload, message } from 'antd';
import storageUtils from '../utils/storageUtils';
import memoryUtils from '../utils/memoryUtils';
import { withRouter, Link } from "react-router-dom";
import {reqLogin} from '../api';
import './label.less';

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

class UserLable extends Component {
  logout = () => {
    storageUtils.removeUser();
    this.props.history.replace('/login');
  }

  handleChange = async(info) => {
    const user = memoryUtils.user;
    if (info.file.status === 'done') {
        message.success("success");
        memoryUtils.user = await reqLogin(user.userId);
        storageUtils.saveUser(memoryUtils.user);
        this.props.history.go(0);
    }
  };

  render() {
    const user = memoryUtils.user;
    const usermenu = (
      <Menu>
        <Menu.Item>
          <div> 姓名: {this.props.user.userName}</div>
          <div> 地址: {this.props.user.address}</div>
          <div> 邮箱: {this.props.user.mail}</div>
          <div> 生日: {this.props.user.birth}</div>
          <a onClick={this.logout} style={{ color: 'red' }}>退出</a>
          <Link to='/repair' style={{ color: 'blue' }}>  修改个人资料</Link>
          <Link to='/repairpwd' style={{ color: 'green' }}>修改密码</Link>
        </Menu.Item>
      </Menu>
    );

    return (
      <div className="user-label">
        <Row gutter={16} type="flex" justify="start">
          <Col span={2} style={{ marginLeft: '10px' }}>
            <Dropdown overlay={usermenu}>
              <a href="#">
                <Avatar src={this.props.user.userIconPath} /> <Icon type="down" />
              </a>
            </Dropdown>
          </Col>
          <Col span={2} style={user.isAdmin ? { display: 'none' } : { marginTop: '5px' }} >
            <Link to='/money'>{user.isAdmin ? '' : '查看金额'}</Link>
          </Col>
          <Col span={2} style={{ marginTop: '5px' }}>
            <Upload
              action={"/api/changAvator?userNo="+user.userNo}  /**上传图片的接口地址 */
              accept='image/*'  /**只接受图片格式 */
              name='avator'
              beforeUpload={beforeUpload}
              onChange={this.handleChange}
            >
              <div style={{ color: "green" }}>上传头像</div>

            </Upload>
          </Col>
        </Row>
      </div>
    );
  }
}
export default (withRouter(UserLable));