import React, { Component } from 'react';
import { Row, Col, Form, Icon, Input, Button, DatePicker, message, Radio } from 'antd';
import './register.less';
import moment from 'moment';
import { reqinsertAUser } from '../../api';
import bcrypt from 'bcryptjs';

class Register extends Component {
  render() {
    return (
      <div className="register">
        <div >
          <Row type="flex" justify="center" >
            <Col span={8} >
              <div className='register-label'>网上书店</div>
              <div style={{ backgroundColor: 'white', marginTop: '30px' }}>
                <div className="form-label">用户注册</div>
                <RegisterForm />
              </div>
            </Col>
          </Row>
        </div>
        <div className="register-footer" style={{ marginTop: '10px', paddingBottom: '30px' }}>
          <a style={{ color: 'white' }} href="https://github.com/ljz572000/online_book_store_frondend"> @2019 by 李金洲 李玮光 软件项目实践课程设计项目</a>
        </div>
      </div>
    );
  }
}


function disabledDate(current) {
  // Can not select days before today and today
  return current && current > moment().endOf('day');
}


class NormalForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const { userid, password, repassword, username, major, address, mail, brith, isFemale } = values;
        if (password !== repassword) {
          message.error("两次输入的密码不一样");
        } else {
          var salt = bcrypt.genSaltSync(10);
          var hash = bcrypt.hashSync(password, salt);
          const response = await reqinsertAUser(userid, false, hash,
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1572716673727&di=b245301eaef365c8623ce611c26b44b0&imgtype=0&src=http%3A%2F%2Fwww.itmop.com%2Fupload%2F2017-9%2F15046867122689390.jpeg',
            username, major, address, mail, brith.format('YYYY-MM-DD'), isFemale);
          message.success(response);
        }
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="common-form">
        <Form.Item style={{ padding: '0 10px' }}>
          {getFieldDecorator('userid', {
            rules: [
              { required: true, whitespace: true, message: '请输入账号!' },
              { min: 7, message: '账号至少7位' },
              { max: 12, message: '账号最多12位' },
              { pattern: /^[0-9_]+$/, message: '账号必须是数字' }
            ],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="账号"
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
              placeholder="请输入密码"
            />,
          )}
        </Form.Item>
        <Form.Item style={{ padding: '0 10px' }}>
          {getFieldDecorator('repassword', {
            rules: [
              { required: true, message: '请输入密码!' },
              { min: 4, message: '密码至少4位' },
              { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或下划线组成' }
            ],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="再次输入密码"
            />,
          )}
        </Form.Item>
        <Form.Item style={{ padding: '0 10px' }}>
          {getFieldDecorator('username', {
            rules: [
              { required: true, message: '请输入用户名!' }
            ],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="请输入用户名"
            />,
          )}
        </Form.Item>
        <Form.Item style={{ padding: '0 10px' }}>
          {getFieldDecorator('major', {
            rules: [
              { required: true, message: '请输入职业!' }
            ],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="请输入职业"
            />,
          )}
        </Form.Item>
        <Form.Item style={{ padding: '0 10px' }}>
          {getFieldDecorator('address', {
            rules: [
              { required: true, message: '请输入地址!' }
            ],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="请输入地址"
            />,
          )}
        </Form.Item>
        <Form.Item style={{ padding: '0 10px' }}>
          {getFieldDecorator('mail', {
            rules: [
              { required: true, message: '请输入个人邮箱!' }
            ],
          })(
            <Input
              prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="请输入邮箱"
            />,
          )}
        </Form.Item>
        <Form.Item style={{ padding: '0 10px' }}>
          {getFieldDecorator('brith', {
            rules: [
              { required: true, message: '请输入生日!' }
            ],
          })(
            <DatePicker
              className="common-form-button"
              prefix={<Icon type="clock-circle" style={{ color: 'rgba(0,0,0,.25)' }} />}
              showTime format="YYYY-MM-DD"
              disabledDate={disabledDate}
              placeholder="请输入生日"
            />,
          )}
        </Form.Item>
        <Form.Item style={{ padding: '0 10px' }}>
          性别：
          {getFieldDecorator('isFemale',{
            rules: [
              { required: true, message: '请选择性别!' }
            ],
          })(
            <Radio.Group className="register-form-forgot">
              <Radio value="false">男</Radio>
              <Radio value="true">女</Radio>
            </Radio.Group>,
          )}
        </Form.Item>
        <Form.Item style={{ padding: '0 10px' }}>
          <Button type="primary" htmlType="submit" className="common-form-button">
            注册
          </Button>
          Or <a href="/login">已有账号！去登录</a>
        </Form.Item>
      </Form>
    );
  }
}


const RegisterForm = Form.create({ name: 'forgot_login' })(NormalForm);

export default Register;
