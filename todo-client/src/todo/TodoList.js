import React, { Component } from 'react';
import { getAllTodos , getTodosBy} from '../util/APIUtils';
import Todo from './Todo';
import { castVote } from '../util/APIUtils';
import LoadingIndicator  from '../common/LoadingIndicator';
import { Button, Icon, notification } from 'antd';
import { Menu, Dropdown, message } from 'antd';
import { withRouter } from 'react-router-dom';
import './TodoList.css';

class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [],
            page: 0,
            size: 10,
            totalElements: 0,
            totalPages: 0,
            last: true,
            isLoading: false
        };
        this.loadTodoList = this.loadTodoList.bind(this);
        this.handleLoadMore = this.handleLoadMore.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    onClick({ key }) {
       this.loadTodoList(key);
    };

    loadTodoList(key) {
        let promise;
        this.setState({
            todos: [],
            page: 0,
            size: 10,
            totalElements: 0,
            totalPages: 0,
            last: true,
            isLoading: false
        });
        if (key==''){
            promise = getAllTodos(0, 30);
        }
        else{
            promise = getTodosBy(key);
        }
        if(!promise) {
            return;
        }

        this.setState({
            isLoading: true
        });

        promise
        .then(response => {
            const todos = this.state.todos.slice();

            this.setState({
                todos: todos.concat(response.content),
                page: response.page,
                size: response.size,
                totalElements: response.totalElements,
                totalPages: response.totalPages,
                last: response.last,
                isLoading: false
            })
        }).catch(error => {
            this.setState({
                isLoading: false
            })
        });
    }

    componentDidMount() {
        this.loadTodoList('');
    }

    componentDidUpdate(nextProps) {
        if(this.props.isAuthenticated !== nextProps.isAuthenticated) {
            // Reset State
            this.setState({
                todos: [],
                page: 0,
                size: 10,
                totalElements: 0,
                totalPages: 0,
                last: true,
                isLoading: false
            });
            this.loadTodoList('');
        }
    }

    handleLoadMore() {
        this.loadTodoList(this.state.page + 1);
    }

    render() {
        const todoViews = [];
        this.state.todos.forEach((todo, todoIndex) => {
            todoViews.push(<Todo
                todo={todo}
                load={this.loadTodoList}
                {...this.props}/>)
        });

        return (
            <div className="todos-container">
            <div className="no-todos-found">
                <Dropdown overlay={<Menu onClick={this.onClick}>
                                       <Menu.Item key="id">By id</Menu.Item>
                                       <Menu.Item key="description">By description</Menu.Item>
                                       <Menu.Item key="status">By status</Menu.Item>
                                     </Menu>}>
                    <a className="ant-dropdown-link" href="#">
                      Filter<Icon type="down" />
                    </a>
                  </Dropdown>
              </div>

                {todoViews}
                {
                    !this.state.isLoading && this.state.todos.length === 0 ? (
                        <div className="no-todos-found">
                            <span>No todos Found.</span>
                        </div>
                    ): null
                }
                {
                    !this.state.isLoading && !this.state.last ? (
                        <div className="load-more-todos">
                            <Button type="dashed" onClick={this.handleLoadMore} disabled={this.state.isLoading}>
                                <Icon type="plus" /> Load more
                            </Button>
                        </div>): null
                }
                {
                    this.state.isLoading ?
                    <LoadingIndicator />: null
                }
            </div>
        );
    }
}

export default withRouter(TodoList);
