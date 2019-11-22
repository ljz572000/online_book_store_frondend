import React, { Component } from 'react';
import { Row, Col, Form, Input, Icon,Button,message} from 'antd';
import {  Link } from "react-router-dom";
import memoryUtils from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils';
import '../common.less';
import {reqchargeMoney,reqLogin} from '../../api';
class Money extends Component {
    render() {
        const user = memoryUtils.user;
        return (
            <div className="common">
                <div className="common-content">
                    <Row type="flex" justify="center" >
                        <Col span={5} >
                            <div className='common-label'>网上书店</div>
                            <div style={{ backgroundColor: 'white', marginTop: '30px' }}>
                                <div className="form-label">{'当前金额：' + parseInt(user.money)}</div>
                                <MoneyForm user={user} tohome={()=>{this.props.history.replace("/user");}} />
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
            const { money } = values;
            const userMoney =  Number(money) + this.props.user.money;
            const response = await reqchargeMoney(this.props.user.userNo,userMoney);
            message.success(response);
            memoryUtils.user = await reqLogin(this.props.user.userId);
            storageUtils.saveUser(memoryUtils.user);
            this.props.tohome();
          }
        });
      };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="common-form">
                <Form.Item style={{ padding: '0 10px' }}>
                    {
                        getFieldDecorator('money', {
                            rules: [
                                { required: true, whitespace: true, message: '请输入充值金额!' },
                                { pattern: /^[0-9,.]+$/, message: '金额包含小数点组成' }
                            ],
                        })(
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="请输入充值金额"
                            />,
                        )}
                </Form.Item>

                <Form.Item style={{ padding: '0 10px' }}>
                    <Button type="primary" htmlType="submit" className="common-form-button">
                        充值金额
                    </Button>
                    Or <Link to='/user'>返回主界面</Link>
                </Form.Item>
            </Form>
        );
    }
}
const MoneyForm = Form.create({ name: 'money' })(NormalForm);
export default Money;