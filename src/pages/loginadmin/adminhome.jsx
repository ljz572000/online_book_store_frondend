import React, { Component } from 'react';
import { Layout, Card, Col, Row, Spin,Form} from 'antd';
import { reqAllTextbooks } from '../../api';
import { Pagination } from 'antd';
import { withRouter } from 'react-router-dom';
import memoryUtils from '../../utils/memoryUtils';
const { Meta } = Card;
const { Content } = Layout;

class AdminHome extends Component {
    state = {
        books: [],
        totalPages: 0,
        pagecount: 1,
        loading: false,
    }
    
    //发起异步ajax请求
    componentDidMount() {
        this.getBooks(this.state.pagecount, 18);
    }

    getBooks = async (pageCount, size) => {
        //发起异步ajax请求，获取数据
        const result = await reqAllTextbooks(pageCount - 1, size);
        const books = result.content;
        const totalPages = result.totalPages;
        const loading = true;
        this.setState({ books, totalPages, pageCount, loading });
    }

    onChange = page => {
        this.getBooks(page, 18);
    }
   
    render() {
        const { books, totalPages, pagecount, loading} = this.state;
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
                        <RouteBookList books={books} />
                    </Row>
                    <Row type="flex" justify="center">
                        <Col span={8} >
                            <Pagination defaultCurrent={pagecount} total={totalPages * 10} onChange={this.onChange} />
                        </Col>
                    </Row>

                </Content>
            )
        }
    }
}

class BookList extends Component {
    showitem(item){
        memoryUtils.book = item;
        this.props.history.push('/admin/changebook');
    }
    getCol = (books) => {
        return books.map((item, index) =>
            (
                <div key={(item, index)} onClick={()=>this.showitem(item)} >
                    <Col span={4} style={{ paddingBottom: 20 }}>
                        <Card
                            hoverable
                            style={item.totalnum===0 ? {backgroundColor: '#D3D3D3',width: 220}:{ width: 220}}

                            cover={
                                <img
                                    style={{ height: 310 }}
                                    alt="pic"
                                    src={item.bookPic}
                                />
                            }
                            title={item.totalnum===0 ? '该书下架了':item.bookName}
                            >
                            <Meta title={'作者：' + item.author} description={'定价：' + item.bookPrice + ' 元'} />
                        </Card>
                    </Col>
                </div>
            )
        )
    }
    render() {
        return (
            <div>{this.getCol(this.props.books)}</div>
        );
    }
}
const RouteBookList = (withRouter(BookList));
const WarpAdminHome = Form.create()(AdminHome)
export default WarpAdminHome;