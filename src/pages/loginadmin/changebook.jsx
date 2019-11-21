import React, { Component } from 'react';
import { Layout, Col, Row, Form, Input, Button, InputNumber, message, Modal } from 'antd';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import memoryUtils from '../../utils/memoryUtils';
import { Redirect } from 'react-router-dom';
import { reqChangeTextBook } from '../../api';
const { Content } = Layout;
class Changebook extends Component {
    state = { visible: false };
    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    handleOk = async(book) => {
        const response = await reqChangeTextBook(0, book.bookPrice, book.bookNo);
        this.setState({
            visible: false,
        });
        message.success(response);
        this.props.history.replace('/admin');
    };

    handleCancel = e => {
        this.setState({visible: false,});
    };

    render() {
        const book = memoryUtils.book;

        if (JSON.stringify(book) === "{}") {
            return <Redirect to='/admin' />
        }
        return (
            <div>
                <Content>
                    <Breadcrumb style={{ marginLeft: '50px' }}>
                        <Breadcrumb.Item>
                            <Link to='/admin/home'>首页</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Link to='/admin/changebook'>修改图书</Link>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                    <Row type="flex" justify="center" gutter={[52, 24]} style={{ marginTop: '20px' }}>
                        <Col span={4}><img src={book.bookPic} alt={book.bookNo} style={{ width: '260px', height: '372px' }} /></Col>
                        <Col span={12}>
                            <Row>
                                <Col><h4 style={{ fontSize: '20px' }}>书名：{book.bookName}</h4></Col>
                                <Col><h4 style={{ fontSize: '20px' }}>作者： {book.author}</h4></Col>
                                <Col><h4 style={{ fontSize: '20px' }}>价格：{book.bookPrice}</h4></Col>
                                <Col><h4 style={{ fontSize: '20px' }}>简介：</h4></Col>
                                <Col><h4>{book.brief}</h4></Col>
                                <Col>
                                    <Button type="danger" onClick={this.showModal} >下架该书</Button>
                                </Col>
                                <Col>
                                    <WrapChangebookForm book={book} tohome={() => { this.props.history.replace('/admin'); }} />
                                </Col>
                           
                            </Row>
                        </Col>
                    </Row>
                </Content>
                <Modal
                        title={"下架：" + book.bookName}
                        visible={this.state.visible}
                        onOk={e => this.handleOk(book)}
                        onCancel={this.handleCancel}
                    >
                        <p>是否下架该书？</p>
                    </Modal>
            </div>
        );
    }
}

class ChangebookForm extends Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            const { book, book_num, book_pirce } = values;
            const response = await reqChangeTextBook(book_num, book_pirce, book);
            message.success(response);
            this.props.tohome();
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (<Form onSubmit={this.handleSubmit}>
            <Form.Item>
                {
                    getFieldDecorator('book', {
                        rules: [],
                        initialValue: this.props.book.bookNo
                    })(
                        <div style={{ display: 'none' }}>
                            <Input />
                        </div>
                    )}
            </Form.Item>
            <Form.Item label="添加库存">
                {
                    getFieldDecorator('book_num', {
                        rules: [
                            { required: true, message: '请输入订购数量!' }
                        ],
                        initialValue: this.props.book.totalnum
                    })(
                        <InputNumber min={0} />,
                    )}
            </Form.Item>
            <Form.Item label="修改价格">
                {
                    getFieldDecorator('book_pirce', {
                        rules: [{ required: true, message: '请输入订购数量!' },
                        { pattern: /^[0-9,.]+$/, message: '数字包含小数点组成' }],
                        initialValue: this.props.book.bookPrice
                    })(
                        <Input style={{ width: '90px' }} />,
                    )}
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit"> 提交 </Button>
            </Form.Item>
        </Form>);
    }
}
const WrapChangebookForm = Form.create()(ChangebookForm);
export default Changebook;