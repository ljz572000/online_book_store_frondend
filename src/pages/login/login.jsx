import React, { Component } from 'react';
import '../common.less';
import { Row, Col, Form, Icon, Input, Button, Checkbox, message } from 'antd';
import { reqLogin } from '../../api';
import bcrypt from 'bcryptjs';
import memoryUtils from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils';
import { withRouter,Redirect } from "react-router-dom";
class Login extends Component {
  render() {
    return (
      <div className="common">
        <div className="common-content">
          <Row type="flex" justify="center" >
            <Col span={5} >
              <div className='common-label'>网上书店</div>
              <div style={{ backgroundColor: 'white', marginTop: '30px' }}>
                <div className="form-label">欢迎使用本系统</div>
                <LoginForm />
              </div>
            </Col>
          </Row>
        </div>
        <div className="common-footer">
          <a style={{ color: 'white' }} target="_blank" rel="github"  href="https://github.com/ljz572000/online_book_store_frondend"> @2019 by 李金洲 李玮光 软件项目实践课程设计项目</a>
        </div>
      </div>
    );
  }
}

class NormalForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const { userId, password, remember } = values;
        const response = await reqLogin(userId);
        if (bcrypt.compareSync(password, response.userPassword)) {
          message.success("登录成功");
          memoryUtils.user = response;
          if (remember) {
            storageUtils.removeUser();
            storageUtils.saveUser(response);//保存本地
          }
          //跳转到管理员界面 
          if (response.isAdmin) {
            this.props.history.replace('/admin');
          } else {
            // 跳转到普通用户界面
            this.props.history.replace('/user');
          }
        } else {
          message.error("登录失败：账号或密码错误");
        }
      }
    });
  };

  localLogin = async (user) => {
    const response = await reqLogin(user.userId);
    if (user.userPassword === response.userPassword) {
      memoryUtils.user = response;
      storageUtils.saveUser(response);//保存本地
      //跳转到管理员界面 
      if (response.isAdmin) {
        return <Redirect to='/admin'/>
      } else {
        // 跳转到普通用户界面
        return <Redirect to='/user'/>
      }
    } else {
      this.props.history.go(0);
    }
  }

  /*
 执行异步任务: 发异步ajax请求
  */
  componentDidMount() {
    const user = storageUtils.getUser();
    if (JSON.stringify(user) === "{}") { } else {
      this.localLogin(user);
    }
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="common-form">
        <Form.Item style={{ padding: '0 10px' }}>
          {getFieldDecorator('userId', {
            rules: [
              { required: true, whitespace: true, message: '请输入用户名!' },
              { min: 7, message: '用户名至少7位' },
              { max: 12, message: '用户名最多12位' }
            ],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="用户名"
            />,
          )}
        </Form.Item>
        <Form.Item style={{ padding: '0 10px' }}>
          {getFieldDecorator('password', {
            rules: [
              { required: true, message: '请输入密码!' },
              { min: 4, message: '密码至少4位' },
              { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或下划线组成' }
            ],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="密码"
            />,
          )}
        </Form.Item>
        <Form.Item style={{ padding: '0 10px' }}>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox>记住我</Checkbox>)}
          <a className="common-form-forgot" href="/forgotpwd">
            忘记密码
              </a>
          <Button type="primary" htmlType="submit" className="common-form-button">
            登录
              </Button>
          Or <a href="/register">现在注册!</a>
        </Form.Item>
      </Form>
    );
  }
}

const LoginForm = Form.create({ name: 'normal_login' })(withRouter(NormalForm));

export default Login;

