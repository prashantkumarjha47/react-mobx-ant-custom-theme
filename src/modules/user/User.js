import React, { Component } from "react";
import { observable } from "mobx";
import { observer, inject } from "mobx-react";
import { Card, Table, Button, Tooltip, message } from "antd";
import Columns from "./Columns";
import PageHeader from '../../globals/components/pageHeader/PageHeader';
import UpdateUser from './updateUser/UpdateUser';
import './User.scss';

@inject("dashboard")
@observer
class User extends Component {
    @observable userList = [
        {
            name: 'Avinash',
            email: 'admin@codingzap.com',
            phoneNumber: '+919035109861',
            address: ' #150, EPIP 2nd phase, KIADB Export Promotion Industrial Area, Whitefield, Bengaluru, Karnataka 560066',
            org: 'Coding Zap Pvt. Ltd.',
            role: 'Admin',
            createdBy: 'Prashant K Jha',
            isActive: true
        },
        {
            name: 'Vishal',
            email: 'vishal@codingzap.com',
            phoneNumber: '07940070170',
            address: '312-B Dev Arc Complex, Above Woodland Showroom, Iscon Cross Road, Sarkhej - Gandhinagar Hwy, Ramdev Nagar, Ahmedabad, Gujarat 380015',
            org: 'Coding Zap Pvt. Ltd.',
            role: 'Admin',
            createdBy: 'Prashant K Jha',
            isActive: true
        }, {
            name: 'Prashant K Jha',
            email: 'prashantkumarjha47@gmail.com',
            phoneNumber: '08028389700',
            address: ' AFS Jalahalli East, Bangalore Jalahalli East, Jalahalli East, Bengaluru, Karnataka 560014',
            org: 'Crazy CoderZ',
            role: 'Admin',
            createdBy: 'Prashant K Jha',
            isActive: true
        }
    ];
    @observable row = {}
    @observable mode = null
    @observable isVisible = false;

    onUserStatusChange = (row) => {
        console.log(row);
    }

    handleCancel = (e, form) => {
        this.toggleModal()
        form.resetFields();
    };

    toggleModal = () => {
        this.isVisible = !this.isVisible
    }

    onEdit = (row) => {
        this.row = row
        this.mode = 'edit'
        this.toggleModal()
    }

    handleOk = (e, form) => {
        e.preventDefault();
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                values.createdBy = "Prashant K Jha"
                values.isActive = true
                if (this.mode) {
                    const newUserList = this.userList.map(org => {
                        if (org.name === values.name) {
                            org = values
                            return org
                        }
                        return org
                    })
                    form.resetFields()
                    this.userList = newUserList
                    this.mode = null
                    message.success('Successfully updated user!')
                    this.toggleModal()
                    return
                }
                this.userList.unshift(values)
                this.toggleModal()
                form.resetFields()
                message.success('Successfully added an user!')
            }
        })
    }

    validateNumber = message => (rule, value, callback) => {
        if (/^[+-]?\d+(\.\d+)?$/.test(value)) {
            callback();
        } else {
            callback(message);
        }
    }

    pm = {
        onUserStatusChange: this.onUserStatusChange,
        handleCancel: this.handleCancel,
        handleOk: this.handleOk,
        validateNumber: this.validateNumber,
        onEdit: this.onEdit
    }
    render() {
        return (
            <div className="user">
                <PageHeader title={'Users'} />
                <UpdateUser pm={this.pm} isVisible={this.isVisible} row={this.row} />
                <Card>
                    <div className="add-btn">
                        <Tooltip placement="left" title={"Add new user"}>
                            <Button type="primary" shape="circle" icon="plus" size={'large'} onClick={this.toggleModal} />
                        </Tooltip>
                    </div>
                    <Table dataSource={this.userList} columns={Columns(this.pm)} scroll={{ x: true }} bordered />
                </Card>
            </div>
        );
    }
}

export default User;
