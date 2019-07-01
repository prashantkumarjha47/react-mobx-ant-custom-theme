import React from "react";
import { Switch, Button } from "antd";

export default function (pm) {
    return [
        {
            title: "Role Title",
            dataIndex: "name",
            rowKey: "name",
            key: "name",
            sorter: (a, b) => {
                if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                return 0;
            }
        },
        {
            title: "Created By",
            dataIndex: "createdBy",
            rowKey: "createdBy",
            key: "createdBy"
        },
        {
            title: "Status",
            dataIndex: "isActive",
            rowKey: "isActive",
            key: "isActive",
            render: (key, rowData) => (
                <Switch
                    checked={key}
                    onChange={e => pm.onOrganisationStatusChange(e, rowData)}
                />
            ),
            sorter: (a, b) => {
                if (a.isActive > b.isActive) return 1;
                if (a.isActive < b.isActive) return -1;
                return 0;
            }
        },
        {
            title: 'Action',
            rowKey: 'action',
            key: 'action',
            width: 150,
            render: (key, rowData) => (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '90px'
                    }}
                >
                    <Button onClick={() => pm.onEdit(rowData)} icon="edit" />
                    {/* <Popconfirm
                  title="Are you sure delete this record?"
                  onConfirm={() => pm.onDelete(key, rowData)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button type="danger" icon="delete" />
                </Popconfirm> */}
                </div>
            )
        }
    ];
}
