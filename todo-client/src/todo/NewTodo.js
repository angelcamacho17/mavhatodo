import React, { Component } from 'react';
import { createTodo, uploadFile } from '../util/APIUtils';
import './NewTodo.css';
import { API_BASE_URL } from '../constants';
import axios, { post } from 'axios';
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
        this.handleTodoSubmit = this.handleTodoSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.fileUpload = this.fileUpload.bind(this);
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
      event.preventDefault(); // Stop form submit
     if(this.state.file!=''){
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
           status:false,
           file:id
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
                          <input type="file" onChange={this.onChange} />
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
