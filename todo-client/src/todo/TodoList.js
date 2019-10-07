import React, { Component } from 'react';
import { getAllTodos } from '../util/APIUtils';
import Todo from './Todo';
import { castVote } from '../util/APIUtils';
import LoadingIndicator  from '../common/LoadingIndicator';
import { Button, Icon, notification } from 'antd';
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
    }

    loadTodoList(page = 0, size = 30) {
        let promise;
        console.log("eeees")
        promise = getAllTodos(page, size);

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
        this.loadTodoList();
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
            this.loadTodoList();
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
