import React, { Component } from 'react';
import './NewTodo.css';
import { Form, Input, Button, Icon, Select, Col, notification, Modal, Checkbox  } from 'antd';
const Option = Select.Option;
const FormItem = Form.Item;
const { TextArea } = Input

class NewTodo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            description:'',
            status:false,
            file:''
        };
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleOk(){
        this.props.unmountMe();
    }

    handleCancel(){
        this.props.unmountMe();
    }

    handleSubmit(){
        this.props.unmountMe();
    }

    render() {
        return (

            <Modal
                visible={true}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                footer={null}
                bodyStyle={{backgroundImage: "linear-gradient(to right,#000000,#434343)"}}
                style={{backgroundImage: "linear-gradient(to right,#000000,#434343)"}}
            >
                <h1 className="page-title">{"Create question "+this.state.number }</h1>
                <div className="new-todo-content">
                    <Form onSubmit={this.handleSubmit} className="create-todo-form">
                        <FormItem className="todo-form-row">
                        <TextArea
                            placeholder="Enter your TODO task"
                            style = {{ fontSize: '16px' ,color:"#123f54"}}
                            autosize={{ minRows: 3, maxRows: 6 }}
                            name = "question"
                            value = {this.state.description} />
                        </FormItem>
                    </Form>
                </div>
            </Modal>
        );
    }
}

export default NewTodo;
