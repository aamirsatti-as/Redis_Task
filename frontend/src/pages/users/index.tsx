import { useQuery, useQueryClient } from "react-query";
import { getAllUsers } from "../../api/apiEndpoints";
import { Table, Modal, message, Form } from "antd";
import { MdEdit, MdDelete } from "react-icons/md";
import { deleteUser } from "../../api/apiEndpoints";
import { useState } from "react";
import EditUser from "./EditUser";
const Users = () => {
    const [form] = Form.useForm();
    const queryClient = useQueryClient()
    const [loading, setLoading] = useState(false)
    const [openUserModal, setOpenUserModal] = useState<{ _id: string } | null>(null);
    const closeUserModal = () => {
        setOpenUserModal(null)
    }
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10
    const { data, isFetching } = useQuery(
        ['users', currentPage, pageSize],
        () => getAllUsers(currentPage, pageSize),
        {
            keepPreviousData: true,
            select: ({ data }) => data,
            initialData: { data: { users: [], total: 0 } } as any,
        }
    );

    const handleTableChange = (pagination: number) => {
        setCurrentPage(pagination);
    };
    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Address",
            dataIndex: "address",
            key: "address",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Edit",
            render: (_: string, record: { _id: string }) => {
                return (
                    <MdEdit className="cursor-pointer" size={25} onClick={() => {
                        form.setFieldsValue(record)
                        setOpenUserModal(record)
                    }} />
                );
            },
        },
        {
            title: "Delete",
            render: (_: string, record: { _id: string }) => {
                if (record._id === localStorage.getItem('userId')) {
                    return null
                }
                else
                    return (
                        <MdDelete className="pointer-cursor text-red-500" size={25} onClick={() => {
                            Modal.confirm({
                                title: "Are you sure you want to delete this User?",
                                onOk: async () => {
                                    const response = await deleteUser(record._id)
                                    if (response?.status === 200) {
                                        queryClient.invalidateQueries(['users'])
                                        message.success("User Deleted Successfully")
                                    }
                                },
                            });
                        }} />
                    );
            },
        },
    ]
    return (
        <div className="p-8">
            <EditUser
                openUserModal={openUserModal}
                closeUserModal={closeUserModal}
                form={form}
                setLoading={setLoading}
                loading={loading}
            />
            <Table
                columns={columns}
                dataSource={data.users}
                loading={isFetching}
                pagination={{
                    current: currentPage,
                    pageSize: pageSize,
                    total: data.totalUsers,
                    onChange: handleTableChange,
                }}
            />
        </div>
    );
};

export default Users;
