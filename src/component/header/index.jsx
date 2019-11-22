import React, { Component } from 'react';
import { Link,withRouter } from 'react-router-dom';
import memoryUtils from '../../utils/memoryUtils';
import { Menu } from 'antd';
import './header.less';
class UserHeader extends Component {
    render() {
        const locate = this.props.location.pathname + '';
        const user = memoryUtils.user;
        if(user.isAdmin){
            return (<div>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={[locate === '/' ? '/admin_home': locate]}
                    style={{ lineHeight: '64px' }}
                    className="menu"
                >
                    <Menu.Item className="menu-item" key="/admin/home">
                        <Link to='/admin/home'>首页</Link>
                    </Menu.Item>
                    <Menu.Item className="menu-item" key="/admin/newbook">
                        <Link to='/admin/newbook'>添加新书</Link>
                    </Menu.Item>
                </Menu>
            </div>);
        }else{
            return (
                <div>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={[locate === '/'? '/user_home': locate]}
                        style={{ lineHeight: '64px' }}
                        className="menu"
                    >
                        <Menu.Item className="menu-item" key="/user_home">
                            <Link to='/user_home'>首页</Link>
                        </Menu.Item>
                        <Menu.Item className="menu-item" key="/user_shopping">
                            <Link to='/user_shopping'>购物车</Link>
                        </Menu.Item>
                        <Menu.Item className="menu-item" key="/user_order">
                            <Link to='/user_order'>订单</Link>
                        </Menu.Item>
                    </Menu>
                </div>
            );
        }  
    }
}

export default withRouter(UserHeader);