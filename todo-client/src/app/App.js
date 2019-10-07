import React, { Component } from 'react';
import './App.css';
import {
  Route,
  withRouter,
  Switch
} from 'react-router-dom';


import TodoList from '../todo/TodoList';
import AppHeader from '../common/AppHeader';
import NotFound from '../common/NotFound';
import LoadingIndicator from '../common/LoadingIndicator';
import PrivateRoute from '../common/PrivateRoute';

import { Layout, notification } from 'antd';
const { Content } = Layout;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }

    notification.config({
      placement: 'topRight',
      top: 70,
      duration: 3,
    });
  }

  render() {
    if(this.state.isLoading) {
      return <LoadingIndicator />
    }
    return (
      <div>
      <AppHeader />
        <Layout className="app-container">
          <Content className="app-content">
            <div className="container">
              <Switch>
                <Route exact path="/"
                  render={(props) => <TodoList  {...props} />}>
                </Route><Route component={NotFound}></Route>
              </Switch>
            </div>
          </Content>
        </Layout>
        </div>
    );
  }
}

export default withRouter(App);
