import React, { Component } from 'react';
import { Row, Col, Form, Icon, Input, Button, message,DatePicker } from 'antd';
import { reqLogin,reqchangeData } from '../../api';
import memoryUtils from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils';
import '../common.less';
import { withRouter,Link } from "react-router-dom";
import moment from 'moment';
class Repair extends Component {
    render() {
        const user = memoryUtils.user;
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
                                    <div className="form-label">修改个人信息</div>
                                    <RepairPwdForm user={user} tohome={()=>{this.props.history.replace("/user");}}  />
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

function disabledDate(current) {
    // Can not select days before today and today
    return current && current > moment().endOf('day');
  }

class NormalForm extends React.Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                const { address, major, mail,brith } = values;
                const response = await reqchangeData(this.props.user.userNo,address,major,mail,brith.format('YYYY-MM-DD'));
                message.success(response);
                memoryUtils.user = await reqLogin(this.props.user.userId);
                storageUtils.saveUser(memoryUtils.user);
                this.props.tohome();
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const user = memoryUtils.user;
        return (
            <Form onSubmit={this.handleSubmit} className="common-form">
                <Form.Item style={{ padding: '0 10px' }}>
                    {getFieldDecorator('address', {
                        rules: [
                            { required: true, message: '请输入地址!' }
                        ],
                        initialValue: user.address 
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder={user.address}
                        />,
                    )}
                </Form.Item>
                <Form.Item style={{ padding: '0 10px' }}>
                    {getFieldDecorator('major', {
                        rules: [
                            { required: true, message: '请输入职业!' }
                        ],
                        initialValue: user.major
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder={user.major}
                        />,
                    )}
                </Form.Item>
                <Form.Item style={{ padding: '0 10px' }}>
                    {getFieldDecorator('mail', {
                        rules: [
                            { required: true, message: '请输入个人邮箱!' }
                        ],
                        initialValue: user.mail
                    })(
                        <Input
                            prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder={user.mail}
                        />,
                    )}
                </Form.Item>
                <Form.Item style={{ padding: '0 10px' }}>
                    {getFieldDecorator('brith', {
                        rules: [
                            { required: true, message: '请输入生日!' }
                        ],
                        initialValue: moment(user.birth)
                    })(
                        <DatePicker
                            className="common-form-button"
                            prefix={<Icon type="clock-circle" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            showTime format="YYYY-MM-DD"
                            disabledDate={disabledDate}
                            placeholder={user.birth}
                        />,
                    )}
                </Form.Item>
                <Form.Item style={{ padding: '0 10px' }}>
                    <Button type="primary" htmlType="submit" className="common-form-button">
                        修改个人资料
            </Button>
            Or <Link to='/user'>返回主界面</Link>
                </Form.Item>
            </Form>
        );
    }
}

const RepairPwdForm = Form.create({ name: 'forgot_login' })(withRouter(NormalForm));
export default Repair;