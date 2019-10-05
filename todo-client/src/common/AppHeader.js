import React, { Component } from 'react';
import {
    Link,
    withRouter
} from 'react-router-dom';
import './AppHeader.css';
import { Layout, Menu, Dropdown, Icon } from 'antd';
const Header = Layout.Header;

class AppHeader extends Component {
    constructor(props) {
        super(props);
        this.handleMenuClick = this.handleMenuClick.bind(this);
    }
    render() {

        return (
            <Header className="app-header">
            <div className="container">
              <div className="app-title" >
                <Link to="/">Todo App</Link>
              </div>
              <Menu
                className="app-menu"
                mode="horizontal"
                selectedKeys={1}
                style={{ lineHeight: '64px' }} >
                <Menu.Item key="/">
                  <Link to="/">
                    <Icon type="home" className="nav-icon" />
                  </Link>
                </Menu.Item>,
                <Menu.Item key="/poll/new">
                <Link to="/poll/new">
                  New todo
                </Link>
              </Menu.Item>
              </Menu>
            </div>
          </Header>
        );
    }
}

export default withRouter(AppHeader);
