import React, { useEffect, useState } from 'react';
import {
    Space,
    Table,
    Popconfirm,
    Button,
    Modal,
    Form,
    Input,
    InputNumber,
    DatePicker
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import _ from 'lodash';
import cls from './TableUsers.module.css';
import dayjs, { Dayjs } from 'dayjs';
import useModal from 'antd/es/modal/useModal';

interface DataType {
    key: string;
    name: string;
    date: Dayjs;
    dateString: string;
    count: number;
}

const data: DataType[] = [
    {
        key: _.uniqueId(),
        name: 'John Brown',
        date: dayjs('05-24-2004', 'MM-DD-YY'),
        dateString: dayjs('05-24-2004', 'MM-DD-YY').format("DD.MM.YYYY").toString(),
        count: 10,
    },
    {
        key: _.uniqueId(),
        name: 'Jim Green',
        count: 42,
        date: dayjs('05-24-2003', 'MM-DD-YY'),
        dateString: dayjs('05-24-2003', 'MM-DD-YY').format("DD.MM.YYYY").toString(),
    },
    {
        key: _.uniqueId(),
        name: 'Joe Black',
        count: 32,
        date: dayjs('06-24-2004', 'MM-DD-YY'),
        dateString: dayjs('06-24-2004', 'MM-DD-YY').format("DD.MM.YYYY").toString(),
    },
];

interface FormType {
    key?: React.Key
    name: string;
    count: number;
    date: Dayjs
}

const TableUsers: React.FC = () => {
    const [users, setUsers] = useState<DataType[]>(data);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm<FormType>();

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = (values: FormType) => {
        setIsModalOpen(false);
        form.resetFields();

        const { key, name, count, date } = values;

        if (key) {
            setUsers((prev) => prev.map(
                (user) => user.key === key ?
                    {
                        key,
                        name,
                        count,
                        date, dateString: date.format("DD.MM.YYYY").toString()
                    }
                    : user
            ))
        } else {
            setUsers((prev) => [{
                key: _.uniqueId(),
                name,
                count,
                date,
                dateString: date.format("DD.MM.YYYY").toString(),
            }, ...prev]);
        }

    };

    const handleCancel = () => {
        setIsModalOpen(false);
        form.resetFields();
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
                    <Button type="default" icon={<EditOutlined />} onClick={() => handleEdit(record)} />
                    <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
                        <Button type="default" icon={<DeleteOutlined />} />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const handleDelete = (key: React.Key) => {
        setUsers(prev => prev.filter(user => user.key !== key));
    };

    const handleEdit = (record: DataType) => {
        console.log(record);
        setIsModalOpen(true);

        form.setFieldsValue({ ...record });
    }

    return (
        <>
            <Button className={cls.button_modal} type="primary" onClick={showModal}>
                Добавить
            </Button>
            <Modal
                title="Basic Modal"
                open={isModalOpen}
                onOk={form.submit}
                onCancel={handleCancel}
                forceRender={true}
            >
                <Form
                    form={form}
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 16 }}
                    layout="horizontal"
                    style={{ maxWidth: 600 }}
                    preserve={false}
                    onFinish={handleOk}
                >
                    <Form.Item
                        label=""
                        name="key"
                        hidden={true}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input name!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Date"
                        name="date"
                        rules={[{ required: true, message: 'Please input date!' }]}
                    >
                        <DatePicker format="DD.MM.YYYY" />
                    </Form.Item>
                    <Form.Item
                        label="Count"
                        name="count"
                        rules={[{ required: true, message: 'Please input count!' }]}

                    >
                        <InputNumber />
                    </Form.Item>

                </Form>
            </Modal>
            <Table columns={columns} dataSource={users} />
        </>

    )
}

export default TableUsers;