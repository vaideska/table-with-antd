import React from 'react';
import { Space, Table, Popconfirm, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

interface DataType {
    key: string;
    name: string;
    date: Date;
    dateString: string;
    count: number;
}

const handleDelete = (key: React.Key) => {
    console.log('delete ' + key);
};

const columns: ColumnsType<DataType> = [
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
        sorter: (a, b) => a.date.getTime() - b.date.getTime(),
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
                <Button type="default" icon={<EditOutlined />} />
                <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
                    <Button type="default" icon={<DeleteOutlined />} />
                </Popconfirm>
            </Space>
        ),
    },
];

const data: DataType[] = [
    {
        key: '1',
        name: 'John Brown',
        date: new Date(2004, 5, 24),
        dateString: new Date(2004, 5, 24).toLocaleDateString(),
        count: 10,
    },
    {
        key: '2',
        name: 'Jim Green',
        count: 42,
        date: new Date(2012, 7, 3),
        dateString: new Date(2012, 7, 3).toLocaleDateString(),
    },
    {
        key: '3',
        name: 'Joe Black',
        count: 32,
        date: new Date(2012, 6, 3),
        dateString: new Date(2012, 6, 3).toLocaleDateString(),
    },
];

const TableUsers: React.FC = () => <Table columns={columns} dataSource={data} />;

export default TableUsers;