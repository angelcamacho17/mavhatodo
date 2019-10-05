import React, { Component } from 'react';
import './App.css';
import {
  Route,
  withRouter,
  Switch
} from 'react-router-dom';

import TodoList from '../todo/TodoList';
import NewTodo from '../todo/NewTodo';
import AppHeader from '../common/AppHeader';
import NotFound from '../common/NotFound';
import LoadingIndicator from '../common/LoadingIndicator';

import { Layout, notification } from 'antd';
const { Content } = Layout;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addTodo: false,
    }

    notification.config({
      placement: 'topRight',
      top: 70,
      duration: 3,
    });
    this.handleAddTodo = this.handleAddTodo.bind(this);
    this.handleCloseTodo = this.handleCloseTodo.bind(this);
  }

  handleAddTodo(){
      this.setState({
          addTodo: true
      });
  }

  handleCloseTodo(){
      this.setState({
          addTodo: false
      });
  }

  render() {
    if(this.state.isLoading) {
      return <LoadingIndicator />
    }
    return (
        <Layout className="app-container">
          <AppHeader isAuthenticated={this.state.isAuthenticated}
            currentUser={this.state.currentUser}
            onLogout={this.handleLogout} />

          <Content className="app-content">
            <div className="container">
              <Switch>
                <Route exact path="/"
                  render={(props) => <TodoList isAuthenticated={this.state.isAuthenticated}
                      currentUser={this.state.currentUser}  {...props} />}>
                </Route>
                <Route component={NotFound}></Route>
              </Switch>
            </div>
          </Content>
        </Layout>
    );
  }
}

export default withRouter(App);
