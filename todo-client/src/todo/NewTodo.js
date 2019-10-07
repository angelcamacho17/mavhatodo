import React, { Component } from 'react';
import { createtodo } from '../util/APIUtils';
import './NewTodo.css';
import { Form, Input, Button, Icon, Select, Col, notification } from 'antd';
const Option = Select.Option;
const FormItem = Form.Item;
const { TextArea } = Input

class NewTodo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            description:''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        console.log("swi");
    }


    render() {

        return (
            <div className="new-todo-container">
                <h1 className="page-title">Create todo</h1>
                <div className="new-todo-content">
                    <Form onSubmit={this.handleSubmit} className="create-todo-form">
                        <FormItem className="todo-form-row">
                        <TextArea
                            placeholder="Enter your to do"
                            style = {{ fontSize: '16px' }}
                            autosize={{ minRows: 3, maxRows: 6 }}
                            name = "question"
                            value = {this.state.description}/>
                        </FormItem>
                        <FormItem className="todo-form-row">
                            <Button type="primary"
                                htmlType="submit"
                                size="large"
                                className="create-todo-form-button">Create todo</Button>
                        </FormItem>
                    </Form>
                </div>
            </div>
        );
    }
}


export default NewTodo;
