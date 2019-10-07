import React, { Component } from 'react';
import {
    Link,
    withRouter
} from 'react-router-dom';
import './AppHeader.css';
import pollIcon from '../poll.svg';
import { Layout, Menu, Dropdown, Icon } from 'antd';
const Header = Layout.Header;

class AppHeader extends Component {
    constructor(props) {
        super(props);
        this.handleMenuClick = this.handleMenuClick.bind(this);
    }

    handleMenuClick({ key }) {
      if(key === "logout") {
        this.props.onLogout();
      }
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
                selectedKeys={[this.props.location.pathname]}
                style={{ lineHeight: '64px' }} >
                <Menu.Item key="/new/todo">
                  <Link to="/new/todo">
                    New Todo  <Icon type="check" className="nav-icon" />
                  </Link>
                </Menu.Item>
              </Menu>
            </div>
          </Header>
        );
    }
}7

export default withRouter(AppHeader);
