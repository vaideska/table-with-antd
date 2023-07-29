import React from 'react';
import {
    Modal,
    Form,
    Input,
    InputNumber,
    DatePicker,
    FormInstance
} from 'antd';
import { FormUserType } from '../../../types/types';

interface UserFormModalProps {
    isModalOpen: boolean;
    form: FormInstance<FormUserType>
    handleCancel: () => void;
    handleSubmit: (values: FormUserType) => void;
}

const UserFormModal: React.FC<UserFormModalProps> = (props) => {
    const { isModalOpen, form, handleCancel, handleSubmit } = props;

    return (
        <Modal
            title="Basic Modal"
            open={isModalOpen}
            onOk={form.submit}
            onCancel={handleCancel}
            forceRender={true}
        >
            <Form
                form={form}
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 16 }}
                layout="horizontal"
                style={{ maxWidth: 600 }}
                preserve={false}
                onFinish={handleSubmit}
            >
                <Form.Item
                    label=""
                    name="key"
                    hidden={true}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Имя"
                    name="name"
                    rules={[{ required: true, message: 'Имя обязательное поле' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Дата"
                    name="date"
                    rules={[{ required: true, message: 'Время обязательнео поле' }]}
                >
                    <DatePicker format="DD.MM.YYYY" />
                </Form.Item>
                <Form.Item
                    label="Количество"
                    name="count"
                    rules={[{ required: true, message: 'Количество обязательное поле' }]}
                >
                    <InputNumber />
                </Form.Item>
            </Form>
        </Modal>

    )
}

export default UserFormModal;