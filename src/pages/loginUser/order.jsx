import React, { Component } from 'react';
import { Layout, Card, Icon, Col, Row, Spin, Form, Modal, message } from 'antd';
import { Pagination } from 'antd';
import memoryUtils from '../../utils/memoryUtils';
import { reqOrders,reqdeleteOrders } from '../../api';
import { withRouter } from 'react-router-dom';
const { Meta } = Card;
const { Content } = Layout;

class Order extends Component {
    state = {
        books: [],
        totalPages: 0,
        pagecount: 1,
        loading: false,
        deleteVisiable: false,
        deleteMessage: {}
    }
    //发起异步ajax请求
    componentDidMount() {
        this.getBooks(this.state.pagecount, 18);
    }
    getBooks = async (pageCount, size) => {
        const user = memoryUtils.user;
        //发起异步ajax请求，获取数据
        const result = await reqOrders(pageCount - 1, size, user.userNo);
        const books = result.content;
        const totalPages = result.totalPages;
        const loading = true;
        this.setState({ books, totalPages, pageCount, loading });
    }
    onChange = page => {
        this.getBooks(page, 12);
    }
    deleteOrder(deleteMessage) {
        this.setState(
            {
                deleteVisiable:true,
                deleteMessage:deleteMessage }
        );
    }

    deleteOk= async (e) => {
        if (e) {
            const current = this.state.deleteMessage;
            const responsedeleteOrders = await reqdeleteOrders(current.orderNo);
            message.success(responsedeleteOrders);
            this.props.history.go(0);
        } else {
            message.error('fail');
        }
    }

    setDeleteVisiable(deleteVisiable){
        this.setState({ deleteVisiable });
    }

    render() {
        const { books, totalPages, pagecount, loading, deleteVisiable,deleteMessage } = this.state;
        if (!loading) {
            return (
                <Content style={{ background: '#ECECEC', padding: '30px', width: '100%', height: '100%' }}>
                    <Row type="flex" justify="center">
                        <Col span={4} >
                            <Spin />
                        </Col>
                    </Row>
                </Content>
            )
        } else {
            return (
                <Content style={{ background: '#ECECEC', padding: '30px' }}>
                    <Row gutter={4}>
                        <RouteBookList books={books} bindDelete={this.deleteOrder.bind(this)} />
                    </Row>
                    <Row type="flex" justify="center">
                        <Col span={8} >
                            <Pagination defaultCurrent={pagecount} total={totalPages* 10} onChange={this.onChange} />
                        </Col>
                    </Row>

                    <DeleteSender
                        deleteVisiable={deleteVisiable}
                        handleOk={this.deleteOk.bind(this)}
                        bindDeleteVisiable={this.setDeleteVisiable.bind(this)}
                        deleteMessage={deleteMessage}
                    />
                </Content>
            )
        }
    }
}

class BookList extends Component {
    showitem(item){
        memoryUtils.book = item.textBook;
        this.props.history.push('/detail_book');
    }
    getCol = (books) => {
        return books.map((item, index) =>
            (
                <div key={(item, index)} onClick={()=>this.showitem(item)} >
                    <Col span={4} style={{ paddingBottom: 20 }}>
                        <Card
                            hoverable
                            style={{ width: 220 }}
                            cover={
                                <img
                                    style={{ height: 310 }}
                                    alt="pic"
                                    src={item.textBook.bookPic}
                                />
                            }
                            actions={[
                                <Icon type="delete" key="delete" onClick={() => this.deleteOrder(item)} />,
                            ]}
                            title={item.textBook.bookName}>
                            <Meta title={'作者：' + item.textBook.author} description={'定价：' + item.textBook.bookPrice + ' 元'} />
                        </Card>
                    </Col>
                </div>
            )
        )
    }
    deleteOrder = (item) => {
        const deleteMessage = item;
        this.props.bindDelete(deleteMessage);
    }

    render() {
        return (
            <div>{this.getCol(this.props.books)}</div>
        );
    }
}

class DeleteSender extends Component {
    handleCancel = e => {
        const deleteVisiable = false;
        this.props.bindDeleteVisiable(deleteVisiable);
    };
    render() {
        if(JSON.stringify(this.props.deleteMessage)==="{}"){
           return(<div></div>);
        }else{
            return (
                <div>
                    <Modal
                        title="删除当前订单"
                        visible={this.props.deleteVisiable}
                        onOk={this.props.handleOk}
                        onCancel={this.handleCancel}>
                        <p>{this.props.deleteMessage.textBook.bookName}</p>
                        <p>价格：{this.props.deleteMessage.bookValues}</p>
                    </Modal>
                </div>
            );
        }
    }
}

const RouteBookList = (withRouter(BookList));
const WrapOrder = Form.create()(Order)
export default WrapOrder;