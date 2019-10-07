import React, { Component } from 'react';
import './Todo.css';
import { API_BASE_URL } from '../constants';
import { Avatar, Icon, notification} from 'antd';
import { Link } from 'react-router-dom';
import { getAvatarColor } from '../util/Colors';
import { doneTodo, deleteTodo, downloadFile} from '../util/APIUtils';
import { Radio, Button } from 'antd';
const RadioGroup = Radio.Group;

class Todo extends Component {

  constructor(props) {
      super(props);
      this.state = {
           isActive:true,
           done:false
       };
      this.handleDone = this.handleDone.bind(this);
      this.handleFileDownload = this.handleFileDownload.bind(this);
      this.handleDelete = this.handleDelete.bind(this);
  }

  handleFileDownload() {
    fetch(API_BASE_URL+'/downloadFile/'+this.props.todo.fileId)
      .then(response => {
      console.log(response);
        /*const filename =  response.headers.get('Content-Disposition').split('filename=')[1];
        response.blob().then(blob => {
          let url = window.URL.createObjectURL(blob);
          let a = document.createElement('a');
          a.href = url;
          a.download = filename;
          a.click();
      });*/
   });
  }

 /* handleFileDownload(){
    downloadFile(this.props.todo.fileId);
    let promise = downloadFile(this.props.todo.fileId)

    if(!promise) {
        return;
    }

    promise
    .then(response => {
        notification.success({
           message: 'Downloading File',
           description: "...",
       });
    }).catch(error => {
        notification.error({
            message: 'Something went worng',
            description:  error.message || 'Sorry! Something went wrong. Please try again!'
        });
    });
  }*/

  handleDone(){
    doneTodo(this.props.todo.id)
    .then(response => {
        this.setState({
            done:!this.state.done
        });
        if(this.state.done){
                notification.success({
                message: 'Done Todo',
                description: "The todo was successfully done",
            });
        }
        else{
            notification.success({
            message: 'Not done yet',
            description: "The todo was successfully un-done",
        });
        }
    }).catch(error => {
        notification.error({
            message: 'Todo App',
            description: error.message || 'Sorry! Something went wrong. Please try again!'
        });

    });
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
        this.setState({
            isActive:false
        });
        notification.success({
            message: 'Todo App',
            description: 'Todo deleted! '
        });
    });
    this.render();
    this.props.history.push("/");
  }
  componentDidMount(){
    this.setState({
        done:this.props.todo.status
    })
  }

    render() {
      //this.props.history.push("/todos/edit_todo/"+this.props.todo.id)
        return (
            <div className={this.state.isActive?"todo-content":""}>
            {this.state.isActive?
                <div className="todo-header">
                    <div className="todo-creator-info">
                          <Avatar className="todo-creator-avatar"
                              style={{ backgroundColor: getAvatarColor(this.props.todo.id)}} >
                              {this.props.todo.id}
                          </Avatar>
                          <span className="todo-creator-name">
                              {this.props.todo.description}
                          </span>
                          <br></br>
                          <span className="todo-creator-username">
                              Status: {this.state.done? "Done":"Pending"}
                          </span>
                          <div className="poll-question-game">
                              {this.props.todo.file}
                          </div>
                    </div>
                    <div className="todo-footer">
                        <Button type="primary" style={{marginRight:'15px'}} onClick={this.handleDone}>{this.state.done===false?'Done':'Not Done'}</Button>
                        <Link to={`/todos/edit_todo/${this.props.todo.id}`}>
                          <Button type="default" style={{marginRight:'15px'}} >Edit</Button>
                        </Link>
                        <Button type="danger" style={{marginRight:'15px'}} onClick={this.handleDelete}>Delete</Button>
                        {this.props.todo.file!='no file'?
                            <Button type="default" style={{marginRight:'15px'}} onClick={this.handleFileDownload} >Download File</Button>
                        :null}
                    </div>
                </div>:null}
            </div>
        );
    }
}

export default Todo;
