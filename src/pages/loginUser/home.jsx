import React, { Component } from 'react';
import { Layout, Card, Icon, Col, Row, Spin, Drawer, Button, InputNumber, Form, Input, Modal } from 'antd';
import { reqTextbooks } from '../../api';
import { message } from 'antd';
import { Pagination } from 'antd';
import memoryUtils from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils';
import { reqbuytextbook, reqUpdateTextBookNum, reqUpdateUserMoney, reqLogin,reqAddShoppingCart } from '../../api';
const { Meta } = Card;
const { Content } = Layout;

class Home extends Component {
    state = {
        books: [],
        totalPages: 0,
        pagecount: 1,
        loading: false,
        buynowVisiable: false,
        seletedItem: {},
        messageVisiable: false,
        message: {},
        ShoppingCartVisiable: false,
        shoppingMessageVisiable: false
    }
    // getCol = (books) => {
    //     return books.map((item, index) =>
    //         (
    //             <div key={(item, index)}>
    //                 <Col span={4} style={{ paddingBottom: 20 }}>
    //                     <Card
    //                         hoverable
    //                         style={{ width: 220 }}
    //                         cover={
    //                             <img
    //                                 style={{ height: 310 }}
    //                                 alt="pic"
    //                                 src={item.bookPic}
    //                             />
    //                         }
    //                         actions={[
    //                             <Icon type="check" key="check" onClick={() => this.showBuyNow(item)} />,
    //                             <Icon type="shopping-cart" key="shopping-cart" onClick={() => this.showAddShoppingCart(item)} />

    //                         ]}
    //                         title={item.bookName}
    //                     >
    //                         <Meta title={'作者：' + item.author} description={'定价：' + item.bookPrice + ' 元'} />
    //                     </Card>
    //                 </Col>
    //             </div>
    //         )
    //     )
    // }
    //发起异步ajax请求
    componentDidMount() {
        this.getBooks(this.state.pagecount, 18);
    }

    getBooks = async (pageCount, size) => {
        //发起异步ajax请求，获取数据
        const result = await reqTextbooks(pageCount - 1, size);
        const books = result.content;
        const totalPages = result.totalPages;
        const loading = true;
        this.setState({ books, totalPages, pageCount, loading });
    }
    onChange = page => {
        this.getBooks(page, 18);
    }
    // showBuyNow = (item) => {
    //     const buynowVisiable = true;
    //     const seletedItem = item;
    //     this.setState({ buynowVisiable })
    //     this.setState({ seletedItem })
    // }
    // showAddShoppingCart = (item) => {
    //     const buynowVisiable = true;
    //     const seletedItem = item;
    //     this.setState({ buynowVisiable })
    //     this.setState({ seletedItem })
    // }

    buynowSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            const { book, book_num } = values;
            this.setState({
                message: { bookName: book.bookName, totalValues: book_num * book.bookPrice, bookNo: book.bookNo, book_num: book_num },
                messageVisiable: true
            });
        })
    }

    buynowOk = async (e) => {
        if (e) {
        const user = memoryUtils.user;
        const current = this.state.message;
        if (user.money <= 0 || user.money < current.totalValues) {
            message.error('当前余额不足');
        } else {
            const responsebuytextbook = await reqbuytextbook(current.bookNo, current.book_num, current.totalValues, user.userNo);
            const responseUpdateTextBookNum = await reqUpdateTextBookNum(current.book_num, current.bookNo);
            const responseUpdateUserMoney = await reqUpdateUserMoney(user.userNo, user.money - current.totalValues);
            if (responsebuytextbook === 'success' && responseUpdateTextBookNum === 'success' && responseUpdateUserMoney === 'success') {
                message.success('success');
                const response = await reqLogin(user.userId);
                memoryUtils.user = response;
                storageUtils.removeUser();
                storageUtils.saveUser(response);//保存本地
                this.props.history.go(0);
            } else {
                message.error('fail');
                this.props.history.go(0);
            }
        }}else{
            message.error('fail');
        }
    };

    shoopingCartOk = async (e) => {
        if (e) {
        const user = memoryUtils.user;
        const current = this.state.message;
        const responsebuytextbook = await reqAddShoppingCart(current.bookNo,current.book_num,current.totalValues,user.userNo);
        message.success(responsebuytextbook);
        }else{
            message.error('fail');
        }
        // console.log(current);
    }

    BookListBuyNowVisiable(buynowVisiable, seletedItem) {
        this.setState({ buynowVisiable, seletedItem });
    }

    BookListShoppingCartVisiable(ShoppingCartVisiable, seletedItem) {
        this.setState({ ShoppingCartVisiable, seletedItem });
    }

    BuyNowDrawer(buynowVisiable) {
        this.setState({ buynowVisiable });
    }

    ShoppingCartDrawer(ShoppingCartVisiable) {
        this.setState({ ShoppingCartVisiable });
    }
    setMessageVisiable(messageVisiable) {
        this.setState({ messageVisiable });
    }
    setShoppingMessage(shoppingMessageVisiable){
        this.setState({ shoppingMessageVisiable });
    }
    AddShoppingCartDrawer(ShoppingCartVisiable) {
        this.setState({ ShoppingCartVisiable });
    }

    AddShoppingCartSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            const { book, book_num } = values;
            this.setState({
                message: { bookName: book.bookName, totalValues: book_num * book.bookPrice, bookNo: book.bookNo, book_num: book_num },
                shoppingMessageVisiable: true
            });
        })
    }

   

    render() {
        const { books, totalPages, pagecount, loading, buynowVisiable, messageVisiable, message, ShoppingCartVisiable,shoppingMessageVisiable } = this.state;
        const { getFieldDecorator } = this.props.form;
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
                        <BookList books={books} bindsetVisiable={this.BookListBuyNowVisiable.bind(this)} bindShoppingCartVisiable={this.BookListShoppingCartVisiable.bind(this)} />
                        {/* {this.getCol(books)} */}
                    </Row>
                    <Row type="flex" justify="center">
                        <Col span={8} >
                            <Pagination defaultCurrent={pagecount} total={totalPages * 10} onChange={this.onChange} />
                        </Col>
                    </Row>
                    <BuyNowDrawer
                        bindBuyNowDrawer={this.BuyNowDrawer.bind(this)}
                        buynowVisiable={buynowVisiable}
                        seletedItem={this.state.seletedItem}
                        getFieldDecorator={getFieldDecorator}
                        handleSubmit={this.buynowSubmit.bind(this)}
                    />
                    <ShoppingCartDrawer
                        bindAddShoppingCartDrawer={this.AddShoppingCartDrawer.bind(this)}
                        ShoppingCartVisiable={ShoppingCartVisiable}
                        seletedItem={this.state.seletedItem}
                        getFieldDecorator={getFieldDecorator}
                        handleSubmit={this.AddShoppingCartSubmit.bind(this)}
                    />
                    <BuyNowSender
                        messageVisiable={messageVisiable}
                        handleOk={this.buynowOk.bind(this)}
                        bindMessageVisiable={this.setMessageVisiable.bind(this)}
                        message={message}
                    />

                    <ShoppingSender
                        messageVisiable={shoppingMessageVisiable}
                        handleOk={this.shoopingCartOk.bind(this)}
                        bindMessageVisiable={this.setShoppingMessage.bind(this)}
                        message={message}
                    />
                </Content>
            )
        }
    }
}

class BookList extends Component {
    getCol = (books) => {
        return books.map((item, index) =>
            (
                <div key={(item, index)}>
                    <Col span={4} style={{ paddingBottom: 20 }}>
                        <Card
                            hoverable
                            style={{ width: 220 }}
                            cover={
                                <img
                                    style={{ height: 310 }}
                                    alt="pic"
                                    src={item.bookPic}
                                />
                            }
                            actions={[
                                <Icon type="check" key="check" onClick={() => this.showBuyNow(item)} />,
                                <Icon type="shopping-cart" key="shopping-cart" onClick={() => this.showAddShoppingCart(item)} />

                            ]}
                            title={item.bookName}>
                            <Meta title={'作者：' + item.author} description={'定价：' + item.bookPrice + ' 元'} />
                        </Card>
                    </Col>
                </div>
            )
        )
    }

    showBuyNow = (item) => {
        const buynowVisiable = true;
        const seletedItem = item;
        this.props.bindsetVisiable(buynowVisiable, seletedItem);
    }
    showAddShoppingCart = (item) => {
        const ShoppingCartVisiable = true;
        const seletedItem = item;
        this.props.bindShoppingCartVisiable(ShoppingCartVisiable, seletedItem);
    }

    render() {
        return (
            <div>{this.getCol(this.props.books)}</div>
        );
    }
}

class BuyNowDrawer extends Component {
    onClose = () => {
        const buynowVisiable = false
        this.props.bindBuyNowDrawer(buynowVisiable);
    }
    render() {
        return (<div>
            <Drawer
                title="订单确认"
                width={520}
                closable={false}
                onClose={this.onClose}
                visible={this.props.buynowVisiable}
                placement={'left'}
            >
                <div>书名： {this.props.seletedItem.bookName}</div>
                <div> <img
                    style={{ height: 310 }}
                    alt="pic"
                    src={this.props.seletedItem.bookPic}
                /></div>
                <div>作者：{this.props.seletedItem.author}</div>
                <div>单价：{this.props.seletedItem.bookPrice}</div>
                <div>当前剩余数量：{this.props.seletedItem.totalnum}</div>
                <Form onSubmit={this.props.handleSubmit}>
                    <Form.Item >
                        {
                            this.props.getFieldDecorator('book', {
                                rules: [],
                                initialValue: this.props.seletedItem
                            })(
                                <div style={{ display: 'none' }}>
                                    <Input />
                                </div>
                            )}
                    </Form.Item>
                    <Form.Item label="订购数量">
                        {
                            this.props.getFieldDecorator('book_num', {
                                rules: [{ required: true, message: '请输入订购数量!' }],
                                initialValue: 1
                            })(
                                <InputNumber min={1} max={this.props.seletedItem.totalnum} />,
                            )}
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit"> 立即购买 </Button>
                    </Form.Item>
                </Form>
            </Drawer>
        </div>);
    }
}

class ShoppingCartDrawer extends Component {
    onClose = () => {
        const ShoppingCartVisiable = false
        this.props.bindAddShoppingCartDrawer(ShoppingCartVisiable);
    }
    render() {
        return (<div>
            <Drawer
                title="添加购物车"
                width={520}
                closable={false}
                onClose={this.onClose}
                visible={this.props.ShoppingCartVisiable}
                placement={'right'}
            >
                <div>书名： {this.props.seletedItem.bookName}</div>
                <div> <img
                    style={{ height: 310 }}
                    alt="pic"
                    src={this.props.seletedItem.bookPic}
                /></div>
                <div>作者：{this.props.seletedItem.author}</div>
                <div>单价：{this.props.seletedItem.bookPrice}</div>
                <div>当前剩余数量：{this.props.seletedItem.totalnum}</div>
                <Form onSubmit={this.props.handleSubmit}>
                    <Form.Item >
                        {
                            this.props.getFieldDecorator('book', {
                                rules: [],
                                initialValue: this.props.seletedItem
                            })(
                                <div style={{ display: 'none' }}>
                                    <Input />
                                </div>
                            )}
                    </Form.Item>
                    <Form.Item label="订购数量">
                        {
                            this.props.getFieldDecorator('book_num', {
                                rules: [{ required: true, message: '请输入订购数量!' }],
                                initialValue: 1
                            })(
                                <InputNumber min={1} max={this.props.seletedItem.totalnum} />,
                            )}
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit"> 立即购买 </Button>
                    </Form.Item>
                </Form>
            </Drawer>
        </div>);
    }
}

class BuyNowSender extends Component {

    handleCancel = e => {
        const messageVisiable = false;
        this.props.bindMessageVisiable(messageVisiable);
    };

    render() {
        return (
            <div>
                <Modal
                    title="确认信息"
                    visible={this.props.messageVisiable}
                    onOk={this.props.handleOk}
                    onCancel={this.handleCancel}
                >
                    <p>{this.props.message.bookName}</p>
                    <p>总价：{this.props.message.totalValues}</p>
                </Modal>
            </div>
        );
    }
}

class ShoppingSender extends Component{
    
    handleCancel = e => {
        const messageVisiable = false;
        this.props.bindMessageVisiable(messageVisiable);
    };
    render() {
        return (
            <div>
                <Modal
                    title="确认添加购物车"
                    visible={this.props.messageVisiable}
                    onOk={this.props.handleOk}
                    onCancel={this.handleCancel}
                >
                    <p>{this.props.message.bookName}</p>
                    <p>总价：{this.props.message.totalValues}</p>
                </Modal>
            </div>
        );
    }
}
const WrapHome = Form.create()(Home)
export default WrapHome;