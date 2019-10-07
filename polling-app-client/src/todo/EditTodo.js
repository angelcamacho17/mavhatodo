import React, { Component } from 'react';
import { updateTodo, getTodo } from '../util/APIUtils';
import './NewTodo.css';
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
            file:''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.isFormInvalid = this.isFormInvalid.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleStatus = this.handleStatus.bind(this);
    }

    handleStatus(event){
      this.setState({
        status:!this.state.status
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


    handleSubmit(event) {
      event.preventDefault();
      const todoData = {
          description: this.state.description.text,
          status:this.state.status,
          file:this.state.file
      };

      updateTodo(todoData,this.state.id)
        .then(response => {
            notification.success({
                message: 'Updated Todo',
                description: "The todo was successfully update",
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
console.log(this.props);
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
                        <FormItem className="todo-form-row">
                            <Button type="primary"
                                htmlType="submit"
                                size="large"
                                disabled={this.isFormInvalid()}
                                className="create-todo-form-button">Update todo</Button>
                        </FormItem>
                    </Form>
                </div>
            </div>
        );
    }
}

export default EditTodo;
