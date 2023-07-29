import React, { useState } from 'react';
import {
    Space,
    Button,
    Form,

} from 'antd';
import _ from 'lodash';
import cls from './UsersTableComponent.module.css';
import Search from 'antd/es/input/Search';
import { FormUserType, UserType } from '../../types/types';
import UserFormModal from './ui/UserFormModal';
import UsersTable from './ui/UsersTable';
import { useFilterUsers } from '../../hooks/useFilterUsers';

const UsersTableComponent: React.FC = () => {
    const [users, setUsers] = useState<UserType[]>([]);
    const [filter, setFilter] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm<FormUserType>();

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        form.resetFields();
    };


    const handleSubmit = (values: FormUserType) => {
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

    const handleDelete = (key: React.Key) => {
        setUsers(prev => prev.filter(user => user.key !== key));
    };

    const handleEdit = (record: UserType) => {
        setIsModalOpen(true);

        form.setFieldsValue({ ...record });
    }

    const handleSearch = (value: string) => {
        setFilter(value);
    }

    const renderUsers = useFilterUsers(users, filter);

    return (
        <>
            <Space>
                <Button
                    className={cls.button_modal}
                    type="primary"
                    onClick={showModal}
                >
                    Добавить
                </Button>
                <Search
                    placeholder="input search text"
                    allowClear
                    onSearch={handleSearch}
                />
            </Space>

            <UserFormModal
                form={form}
                handleCancel={handleCancel}
                handleSubmit={handleSubmit}
                isModalOpen={isModalOpen}
            />
            <UsersTable
                data={renderUsers}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
            />
        </>

    )
}

export default UsersTableComponent;