import React, { Component } from "react";
import { observable } from "mobx";
import { observer, inject } from "mobx-react";
import { Card, Table, Button, Tooltip, message } from "antd";
import Columns from "./Columns";
import PageHeader from '../../globals/components/pageHeader/PageHeader';
import UpdateOrganisation from './updateOrganisation/UpdateOrganisation';
import './Organisation.scss';

@inject("dashboard")
@observer
class Organisation extends Component {
    @observable organisationList = [
        {
            name: 'Coding Zap Pvt. Ltd.',
            email: 'admin@codingzap.com',
            phoneNumber: '+919035109861',
            address: ' #150, EPIP 2nd phase, KIADB Export Promotion Industrial Area, Whitefield, Bengaluru, Karnataka 560066',
            orgType: 'Company',
            createdBy: 'Prashant K Jha',
            isActive: true
        },
        {
            name: 'Simform Solutions Pvt. Ltd.',
            email: 'admin@simformsolutions.com',
            phoneNumber: '07940070170',
            address: '312-B Dev Arc Complex, Above Woodland Showroom, Iscon Cross Road, Sarkhej - Gandhinagar Hwy, Ramdev Nagar, Ahmedabad, Gujarat 380015',
            orgType: 'Company',
            createdBy: 'Prashant K Jha',
            isActive: true
        }, {
            name: 'Kendriya Vidyalaya',
            email: 'SUNIL KUMAR V.S',
            phoneNumber: '08028389700',
            address: ' AFS Jalahalli East, Bangalore Jalahalli East, Jalahalli East, Bengaluru, Karnataka 560014',
            orgType: 'School',
            createdBy: 'Prashant K Jha',
            isActive: true
        }
    ];
    @observable row = {}
    @observable mode = null
    @observable isVisible = false;

    onOrganisationStatusChange = (row) => {
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
                    const newOrganisationList = this.organisationList.map(org => {
                        if (org.name === values.name) {
                            org = values
                            return org
                        }
                        return org
                    })
                    form.resetFields()
                    this.organisationList = newOrganisationList
                    this.mode = null
                    message.success('Successfully updated organisation!')
                    this.toggleModal()
                    return
                }
                this.organisationList.unshift(values)
                this.toggleModal()
                form.resetFields()
                message.success('Successfully added an organisation!')
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
        onOrganisationStatusChange: this.onOrganisationStatusChange,
        handleCancel: this.handleCancel,
        handleOk: this.handleOk,
        validateNumber: this.validateNumber,
        onEdit: this.onEdit
    }
    render() {
        return (
            <div className="organisation">
                <PageHeader title={'Organisations'} />
                <UpdateOrganisation pm={this.pm} isVisible={this.isVisible} row={this.row} />
                <Card>
                    <div className="add-btn">
                        <Tooltip placement="left" title={"Add new organisation"}>
                            <Button type="primary" shape="circle" icon="plus" size={'large'} onClick={this.toggleModal} />
                        </Tooltip>
                    </div>
                    <Table dataSource={this.organisationList} columns={Columns(this.pm)} scroll={{ x: true }} bordered />
                </Card>
            </div>
        );
    }
}

export default Organisation;
