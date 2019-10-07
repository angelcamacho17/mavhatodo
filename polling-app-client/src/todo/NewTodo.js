import React, { Component } from 'react';
import { createTodo, uploadFile } from '../util/APIUtils';
import './NewTodo.css';
import MyUpload from '../file/MyUpload';
import { Form, Input, Button, Icon, Select, Col, notification } from 'antd';
const Option = Select.Option;
const FormItem = Form.Item;
const { TextArea } = Input

class NewTodo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            description:{
              text:''
            },
            file:''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
        this.handleUploadFile = this.handleUploadFile.bind(this);
        this.isFormInvalid = this.isFormInvalid.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
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


    handleSubmit(event) {
      event.preventDefault();
      const todoData = {
          description: this.state.description.text,
          status:false,
          file:''
      };

      createTodo(todoData)
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

    handleUploadFile(files){
      this.setState({
        file:files
      });
      console.log( this.state.file[0]);
    }

    handleUpload(){
      const formData = new FormData();
      formData.append('file', this.state.file[0]);
      
      uploadFile(formData)
      .then(response => {
          notification.success({
              message: 'File upload',
              description: "The file was successfully upload",
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
                <h1 className="page-title">Create todo</h1>
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
                        <FormItem className="todo-form-row">
                          <MyUpload onUpload={this.handleUploadFile}></MyUpload>
                          <Button onClick={this.handleUpload}>
                            Save
                          </Button>
                        </FormItem>

                        <FormItem className="todo-form-row">
                            <Button type="primary"
                                htmlType="submit"
                                size="large"
                                disabled={this.isFormInvalid()}
                                className="create-todo-form-button">Create todo</Button>
                        </FormItem>
                    </Form>
                </div>
            </div>
        );
    }
}

export default NewTodo;
