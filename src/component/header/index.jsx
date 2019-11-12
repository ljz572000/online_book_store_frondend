import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import './header.less';
class UserHeader extends Component {
    render() {
        return (
            <div>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['/user_home']}
                    style={{ lineHeight: '64px' }}
                    className="menu"
                >
                    <Menu.Item className="menu-item" key="/user_home">
                        <Link to='/user_home'>
                            首页
              </Link>

                    </Menu.Item>
                    <Menu.Item className="menu-item" key="/user_shopping">
                        <Link to='/user_shopping'>
                            购物车
              </Link>

                    </Menu.Item>
                    <Menu.Item className="menu-item" key="/user_me">
                        <Link to='/user_me'>
                            我
              </Link>
                    </Menu.Item>
                </Menu>
            </div>
        );
    }
}

export default UserHeader;