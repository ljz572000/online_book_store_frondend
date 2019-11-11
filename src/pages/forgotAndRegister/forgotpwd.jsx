import React, { Component } from 'react';
import { Row, Col, Form, Icon, Input, Button,message } from 'antd';
import { reqGoToResetPage } from '../../api';
import '../common.less';
class ForgotPwd extends Component {
  render() {
    return (
      <div className="common">
        <div className="common-content">
          <Row type="flex" justify="center" >
            <Col span={5} >
              <div className='common-label'>网上书店</div>
              <div style={{ backgroundColor: 'white', marginTop: '30px' }}>
                <div className="form-label">重置密码</div>
                <ForgotForm />
              </div>
            </Col>
          </Row>
        </div>
        <div className="common-footer">
          <a style={{ color: 'white' }} href="https://github.com/ljz572000/online_book_store_frondend"> @2019 by 李金洲 李玮光 软件项目实践课程设计项目</a>
        </div>
      </div>
    );
  }
}

class NormalForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields( async(err, values) => {
      if (!err) {
        const { userId } = values;
        const response = await reqGoToResetPage(userId);
        if (response === 'success') {
          message.success('请注意查看邮箱信息');
      } else {
          message.error(response);
      }
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="common-form">
        <Form.Item style={{ padding: '0 10px' }}>
          {
            getFieldDecorator('userId', {
              rules: [
                { required: true, whitespace: true, message: '请输入账号!' },
                { min: 7, message: '用户名至少7位' },
                { max: 12, message: '用户名最多12位' }
              ],
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="请输入账号"
              />,
            )}
        </Form.Item>
        <Form.Item style={{ padding: '0 10px' }}>
          <Button type="primary" htmlType="submit" className="common-form-button">
            重置密码
          </Button>
          Or <a href="/login">完成重置！去登录</a>
        </Form.Item>
      </Form>
    );
  }
}

const ForgotForm = Form.create({ name: 'forgot_login' })(NormalForm);

export default ForgotPwd;
