import React, { Component } from 'react';
import { Row, Col, Form, Icon, Input, Button, message } from 'antd';
import { reqrepairPwd, reqLogin } from '../../api';
import memoryUtils from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils';
import bcrypt from 'bcryptjs';
import '../common.less';
import { withRouter } from "react-router-dom";
class RepairPwd extends Component {
    render() {
        let user = memoryUtils.user;
        if (JSON.stringify(user) === "{}") {
            this.props.history.replace('/login');
            return (<div></div>);
        } else {
            return (
                <div className="common">
                    <div className="common-content">
                        <Row type="flex" justify="center" >
                            <Col span={5} >
                                <div className='common-label'>网上书店</div>
                                <div style={{ backgroundColor: 'white', marginTop: '30px' }}>
                                    <div className="form-label">修改密码</div>
                                    <RepairPwdForm />
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
}


class NormalForm extends React.Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                const { oldpassword, newpassword, repassword } = values;
                const user = memoryUtils.user;
                switch (newpassword) {
                    case oldpassword: message.warning('新旧密码相同'); break;
                    case repassword:
                        const loginresponse = await reqLogin(user.userId);
                        if (bcrypt.compareSync(oldpassword, loginresponse.userPassword)) {
                            var salt = bcrypt.genSaltSync(10);
                            var hash = bcrypt.hashSync(newpassword, salt);
                            const response = await reqrepairPwd(user.userNo, hash);
                            message.success(response);
                            storageUtils.removeUser();
                            this.props.history.replace('/login');
                        } else {
                            message.error('你输入旧密码错误');
                        }

                        break;
                    default: message.warning('两次输入的密码不相同');
                }
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="common-form">
                <Form.Item style={{ padding: '0 10px' }}>
                    {getFieldDecorator('oldpassword', {
                        rules: [
                            { required: true, message: '请输入密码!' },
                            { min: 4, message: '密码至少4位' },
                            { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或下划线组成' }
                        ],
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="请输入旧密码"
                        />,
                    )}
                </Form.Item>
                <Form.Item style={{ padding: '0 10px' }}>
                    {getFieldDecorator('newpassword', {
                        rules: [
                            { required: true, message: '请输入密码!' },
                            { min: 4, message: '密码至少4位' },
                            { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或下划线组成' }
                        ],
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="请输入新密码"
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
                            placeholder="请再次输入密码"
                        />,
                    )}
                </Form.Item>
                <Form.Item style={{ padding: '0 10px' }}>
                    <Button type="primary" htmlType="submit" className="common-form-button">
                        修改密码
            </Button>
                </Form.Item>
            </Form>
        );
    }
}

const RepairPwdForm = Form.create({ name: 'forgot_login' })(withRouter(NormalForm));
export default RepairPwd;