import React, { Component } from "react";
import { observable } from "mobx";
import { observer, inject } from "mobx-react";
import { Card, Table, Button, Tooltip, message } from "antd";
import Columns from "./Columns";
import PageHeader from '../../globals/components/pageHeader/PageHeader';
import UpdateRoles from './updateRoles/UpdateRoles';
import './Roles.scss';

@inject("dashboard")
@observer
class Role extends Component {
    @observable roleList = [
        {
            id: 1,
            name: 'Admin',
            createdBy: 'Prashant K Jha',
            isActive: true
        },
        {
            id: 2,
            name: 'Super Admin',
            createdBy: 'Prashant K Jha',
            isActive: true
        }, {
            id: 3,
            name: 'Member',
            createdBy: 'Prashant K Jha',
            isActive: true
        }
    ];
    @observable row = {}
    @observable mode = null
    @observable isVisible = false;

    onRoleStatusChange = (row) => {
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
                values.id = this.roleList.length
                values.createdBy = "Prashant K Jha"
                values.isActive = true
                if (this.mode) {
                    const newRoleList = this.roleList.map(role => {
                        if (role.id === this.row.id) {
                            role = values
                            return role
                        }
                        return role
                    })
                    form.resetFields()
                    this.roleList = newRoleList
                    this.mode = null
                    this.row = {}
                    message.success('Successfully updated role!')
                    this.toggleModal()
                    return
                }
                this.roleList.unshift(values)
                this.toggleModal()
                form.resetFields()
                message.success('Successfully added an role!')
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
        onRoleStatusChange: this.onRoleStatusChange,
        handleCancel: this.handleCancel,
        handleOk: this.handleOk,
        validateNumber: this.validateNumber,
        onEdit: this.onEdit
    }
    render() {
        return (
            <div className="role">
                <PageHeader title={'Roles'} />
                <UpdateRoles pm={this.pm} isVisible={this.isVisible} row={this.row} />
                <Card>
                    <div className="add-btn">
                        <Tooltip placement="left" title={"Add new role"}>
                            <Button type="primary" shape="circle" icon="plus" size={'large'} onClick={this.toggleModal} />
                        </Tooltip>
                    </div>
                    <Table dataSource={this.roleList} columns={Columns(this.pm)} scroll={{ x: true }} bordered />
                </Card>
            </div>
        );
    }
}

export default Role;
