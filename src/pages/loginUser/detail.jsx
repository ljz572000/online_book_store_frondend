import React, { Component } from 'react';
import memoryUtils from '../../utils/memoryUtils';
import { Redirect,Link } from 'react-router-dom';
import { Layout, Col, Row,Breadcrumb } from 'antd';
const { Content } = Layout;
class Detail extends Component{
    state = {
        loading: false
    }
    render(){
        const book = memoryUtils.book;
     
        if (JSON.stringify(book) === "{}") {
            return <Redirect to='/user_home' />
        }
        return(
            <div>
            <Content>
                <Breadcrumb style={{ marginLeft: '50px' }}>
                    <Breadcrumb.Item>
                        <Link to='/user_home'>首页</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <Link to='/detail_book'>图书详情</Link>
                    </Breadcrumb.Item>
                </Breadcrumb>
                <Row type="flex" justify="center" gutter={[52, 24]} style={{marginTop: '20px'}}>
                    <Col span={4}><img src={book.bookPic} alt={book.bookNo} style={{ width: '260px', height: '372px' }} /></Col>
                    <Col span={12}>
                        <Row>
                            <Col><h4 style={{ fontSize: '20px' }}>书名：{book.bookName}</h4></Col>
                            <Col><h4 style={{ fontSize: '20px' }}>作者： {book.author}</h4></Col>
                            <Col><h4 style={{ fontSize: '20px' }}>价格：{book.bookPrice}</h4></Col>
                            <Col><h4 style={{ fontSize: '20px' }}>简介：</h4></Col>
                            <Col><h4>{book.brief}</h4></Col>
                        </Row>

                    </Col>

                </Row>
                <div style={{ backgroundColor: 'red', marginTop: '20px', marginLeft: '50px' }}>

                    <div style={{ float: 'right', paddingRight: '60px' }}>

                    </div>

                </div>
            </Content>
        </div>
        );
    }
}
export default Detail;