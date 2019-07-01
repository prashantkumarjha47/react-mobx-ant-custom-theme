import React from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { observer } from 'mobx-react';

const FormItem = Form.Item;
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
const UpdateRole = ({ pm, form, isVisible, row }) => {
    const { getFieldDecorator } = form;
    return (
        <div className="update-role">
            <Modal
                title="Role"
                visible={isVisible}
                footer={null}
                onCancel={e => pm.handleCancel(e, form)}
            >
                <Form onSubmit={e => pm.handleOk(e, form)}>
                    <FormItem {...formItemLayout} label="Role Title :">
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
    observer(UpdateRole)
);