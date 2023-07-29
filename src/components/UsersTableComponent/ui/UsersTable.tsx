import React from 'react';
import {
    Space,
    Table,
    Popconfirm,
    Button,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import _ from 'lodash';
import { UserType } from '../../../types/types';

interface UsersTableProps {
    data: UserType[];
    handleEdit: (record: UserType) => void;
    handleDelete: (key: React.Key) => void;
}

const UsersTable: React.FC<UsersTableProps> = (props) => {
    const { data, handleEdit, handleDelete } = props;

    const columns: ColumnsType<UserType> = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: 'Date',
            dataIndex: 'dateString',
            key: 'date',
            sorter: (a, b) => a.date.valueOf() - b.date.valueOf(),
        },
        {
            title: 'Count',
            dataIndex: 'count',
            key: 'count',
            sorter: (a, b) => a.count - b.count,
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button
                        type="default"
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(record)}
                    />
                    <Popconfirm
                        title="Sure to delete?"
                        onConfirm={() => handleDelete(record.key)}
                    >
                        <Button type="default" icon={<DeleteOutlined />} />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return <Table columns={columns} dataSource={data} />
}

export default UsersTable;