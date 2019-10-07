import React, { Component } from 'react';
import { updateTodo, getTodo } from '../util/APIUtils';
import './NewTodo.css';
import { API_BASE_URL } from '../constants';
import axios, { post } from 'axios';
import { Form, Input, Button, Icon, Select, Col,Checkbox, notification } from 'antd';
const Option = Select.Option;
const FormItem = Form.Item;
const { TextArea } = Input

class EditTodo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id:0,
            description:{
              text:''
            },
            status:false,
            file:'',
            changeFile:false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTodoSubmit = this.handleTodoSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.fileUpload = this.fileUpload.bind(this);
        this.isFormInvalid = this.isFormInvalid.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleStatus = this.handleStatus.bind(this);
        this.handleSelectFile = this.handleSelectFile.bind(this);
    }

    handleStatus(event){
      this.setState({
        status:!this.state.status
      });
    }

    handleSelectFile(){
        this.setState({
            changeFile:!this.state.changeFile
        });
    }

    handleDescriptionChange(event) {
        const value = event.target.value;
        this.setState({
            description: {
                   text:value,
                   ...this.validateDescription(value)
            }

        });
    }

    validateDescription = (choiceText) => {
        if(choiceText.length === 0) {
            return {
                validateStatus: 'error',
                errorMsg: 'Please enter a description!'
            }
        } else if (choiceText.length > 140) {
            return {
                validateStatus: 'error',
                errorMsg: `Choice is too long (Maximum 140 characters allowed)`
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null
            }
        }
    }

    onChange(e) {
        this.setState({file:e.target.files[0]})
      }

    fileUpload(file){
        const url = API_BASE_URL + "/uploadFile";
        const formData = new FormData();
        formData.append('file',file)
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return  post(url, formData,config)
      }

    handleSubmit(event) {
      event.preventDefault(); // Stop form submit
      console.log(this.state.file)
     if(this.state.file!=''&& this.state.changeFile){
         let promise = this.fileUpload(this.state.file);
         promise
         .then(response=>{
            this.handleTodoSubmit(response.data.id);
         }).catch(error => {
            console.log(error);
         });
     }
     else{
        this.handleTodoSubmit('');
      }

    }

    handleTodoSubmit(id){
        const todoData = {
           description: this.state.description.text,
           status:this.state.status,
           file:id
       };
       updateTodo(todoData,this.state.id)
         .then(response => {
             notification.success({
                 message: 'New Todo',
                 description: "The todo was successfully created",
             });
         }).catch(error => {
             notification.error({
                 message: 'Todo App',
                 description: error.message || 'Sorry! Something went wrong. Please try again!'
             });

         });
         this.props.history.push("/");
    }

    isFormInvalid() {
      if(this.state.description.validateStatus !== 'success') {
          return true;
      }
    }

    componentDidMount(){
      getTodo(this.props.match.params.todoId)
      .then(response => {
        this.setState({
          id:this.props.match.params.todoId,
          description:{
            text:response.description
          },
          file:response.file,
          status:response.status
        });
      }).catch(error => {
          notification.error({
              message: 'Todo App',
              description: error.message || 'Sorry! Something went wrong. Please try again!'
          });

      });
    }

    render() {
        return (
            <div className="new-todo-container">
                <h1 className="page-title">Edit todo</h1>
                <div className="new-todo-content">
                    <Form onSubmit={this.handleSubmit} className="create-todo-form">
                        <FormItem validateStatus={this.state.description.validateStatus}
                            help={this.state.description.errorMsg} className="todo-form-row">
                        <TextArea
                            placeholder="Enter your to do"
                            style = {{ fontSize: '16px' }}
                            autosize={{ minRows: 3, maxRows: 6 }}
                            name = "todo"
                            value = {this.state.description.text}
                            onChange = {this.handleDescriptionChange}/>
                        </FormItem>

                        {!this.state.changeFile?
                        <FormItem className="todo-form-row">
                            <h5>{this.state.file!=''?'File:' +this.state.file:'No file'}</h5>
                         </FormItem>:null}
                        {this.state.changeFile?<FormItem className="todo-form-row">
                          <input type="file" onChange={this.onChange} />
                        </FormItem>:null}

                        <FormItem className="todo-form-row">
                            <Button type="default"
                            className="create-todo-form-button"
                            onClick={this.handleSelectFile}>Select a diferent file</Button>
                        </FormItem>
                        <FormItem className="todo-form-row">
                        <Checkbox
                          checked={this.state.status}
                          onChange={this.handleStatus}
                        >
                          Done
                        </Checkbox>
                        <Checkbox
                          checked={!this.state.status}
                          onChange={this.handleStatus}
                        >
                          Pending
                        </Checkbox>
                        </FormItem>
                        <FormItem className="todo-form-row">
                            <Button type="primary"
                                htmlType="submit"
                                size="large"
                                className="create-todo-form-button">Update todo</Button>
                        </FormItem>
                    </Form>
                </div>
            </div>
        );
    }
}

export default EditTodo;
