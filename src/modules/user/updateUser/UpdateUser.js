import React from 'react';
import { Modal, Form, Input, Button, Select } from 'antd';
import { observer } from 'mobx-react';

const FormItem = Form.Item;
const { Option } = Select
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
    }
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0
        },
        sm: {
            span: 16,
            offset: 8
        }
    }
};
const UpdateUser = ({ pm, form, isVisible, row }) => {
    const { getFieldDecorator } = form;
    return (
        <div className="update-org">
            <Modal
                title="User"
                visible={isVisible}
                footer={null}
                onCancel={e => pm.handleCancel(e, form)}
            >
                <Form onSubmit={e => pm.handleOk(e, form)}>
                    <FormItem {...formItemLayout} label="Name :">
                        {getFieldDecorator('name', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please enter name to update!'
                                }
                            ],
                            initialValue: row.name
                        })(<Input />)}
                    </FormItem>
                    <FormItem {...formItemLayout} label="E-mail :">
                        {getFieldDecorator('email', {
                            rules: [
                                {
                                    required: true,
                                    type: 'email',
                                    message: 'Please enter a valid email to update!'
                                }
                            ],
                            initialValue: row.email
                        })(<Input />)}
                    </FormItem>
                    <FormItem {...formItemLayout} label="Phone Number :">
                        {getFieldDecorator('phoneNumber', {
                            rules: [
                                {
                                    required: true,
                                    validator: pm.validateNumber(
                                        'Please enter a valid phone number'
                                    )
                                }
                            ],
                            initialValue: row.phoneNumber
                        })(<Input />)}
                    </FormItem>
                    <FormItem {...formItemLayout} label="Address :">
                        {getFieldDecorator('address', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please enter address to update!'
                                }
                            ],
                            initialValue: row.address
                        })(<Input />)}
                    </FormItem>
                    <FormItem {...formItemLayout} label="Org. Type :">
                        {getFieldDecorator('org', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please enter a valid orgType to update!'
                                }
                            ],
                            initialValue: row.org
                        })(<Select
                            showSearch
                            placeholder="Select an org. type"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            <Option value="Coding Zap Pvt. Ltd.">Coding Zap Pvt. Ltd.</Option>
                            <Option value="Simform Solutions Pvt. Ltd.">Simform Solutions Pvt. Ltd.</Option>
                            <Option value="Crazy CoderZ">Crazy CoderZ</Option>
                        </Select>)}
                    </FormItem>

                    <FormItem {...formItemLayout} label="Role :">
                        {getFieldDecorator('role', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please enter a valid role to update!'
                                }
                            ],
                            initialValue: row.role
                        })(<Select
                            showSearch
                            placeholder="Select an role"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            <Option value="Admin">Admin</Option>
                            <Option value="Member">Member</Option>
                            <Option value="Super Admin">Super Admin</Option>
                        </Select>)}
                    </FormItem>
                    <FormItem {...tailFormItemLayout}>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                width: '170px'
                            }}
                        >
                            <Button type="primary" htmlType="submit">
                                Save
                            </Button>
                        </div>
                    </FormItem>
                </Form>
            </Modal>
        </div>
    );
};

export default Form.create()(
    observer(UpdateUser)
);