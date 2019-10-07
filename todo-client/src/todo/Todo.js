import React, { Component } from 'react';
import './Todo.css';
import { Avatar, Icon, notification} from 'antd';
import { Link } from 'react-router-dom';
import { getAvatarColor } from '../util/Colors';
import { doneTodo, deleteTodo} from '../util/APIUtils';

import { Radio, Button } from 'antd';
const RadioGroup = Radio.Group;

class Todo extends Component {

  constructor(props) {
      super(props);
      this.handleDone = this.handleDone.bind(this);
      this.handleDelete = this.handleDelete.bind(this);
  }

  handleDone(){
    doneTodo(this.props.todo.id)
    .then(response => {
        notification.success({
            message: 'Done Todo',
            description: "The todo was successfully done",
        });
    }).catch(error => {
        notification.error({
            message: 'Todo App',
            description: error.message || 'Sorry! Something went wrong. Please try again!'
        });

    });
    this.props.load();
    this.props.history.push("/");
  }

  handleDelete(){
    deleteTodo(this.props.todo.id)
    .then(response => {
        notification.success({
            message: 'Deleted Todo',
            description: "The todo was successfully deleted",
        });
    }).catch(error => {
        notification.success({
            message: 'Todo App',
            description: 'Todo deleted! Please refresh'
        });
    });
    this.props.load();
    this.props.history.push("/");
  }

    render() {
      //this.props.history.push("/todos/edit_todo/"+this.props.todo.id)
      console.log(this.props.todo);
      console.log(this.props);
        return (
            <div className="todo-content">
                <div className="todo-header">
                    <div className="todo-creator-info">
                          <Avatar className="todo-creator-avatar"
                              style={{ backgroundColor: getAvatarColor(this.props.todo.description)}} >
                              {this.props.todo.description[0].toUpperCase()}
                          </Avatar>
                          <span className="todo-creator-name">
                              {this.props.todo.description}
                          </span>
                          <br></br>
                          <span className="todo-creator-username">
                              Status: {this.props.todo.status? "Done":"Pending"}
                          </span>
                          <div className="poll-question-game">
                              {this.props.todo.file}
                          </div>
                    </div>
                    <div className="todo-footer">
                        <Button type="primary" style={{marginRight:'15px'}} onClick={this.handleDone}>{this.props.todo.status===false?'Done':'Not Done'}</Button>
                        <Link to={`/todos/edit_todo/${this.props.todo.id}`}>
                          <Button type="default" style={{marginRight:'15px'}} >Edit</Button>
                        </Link>
                        <Button type="danger" style={{marginRight:'15px'}} onClick={this.handleDelete}>Delete</Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Todo;
