import React, { Component } from 'react';
import './Todo.css';
import { Avatar, Icon } from 'antd';
import { Link } from 'react-router-dom';

import { Radio, Button } from 'antd';
const RadioGroup = Radio.Group;

class Todo extends Component {

    render() {
        return (
          <div className="todo-content">
              <div className="todo-header">
                  <div className="todo-creator-info">
                    <span className="todo-creator-name">
                          {this.props.todo.description}
                    </span>
                    <br></br>
                    <span className="todo-creator-username">
                        Status: {this.props.todo.status? "Done":"Pending"}
                    </span>
                  </div>
              </div>
          </div>
        );
    }

}

export default Todo;
