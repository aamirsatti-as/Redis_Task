import { Modal, Form, Button, Input, message } from "antd"
import { updateUser } from "../../api/apiEndpoints"
import { useQueryClient } from "react-query"
interface EditUserProps {
    openUserModal: null | {_id: string};
    closeUserModal: () => void;
    form: any; // Assuming form is an object with string values
    loading: boolean;
    setLoading: (loading: boolean) => void;
  }
const EditUser = ({ openUserModal, closeUserModal, form, loading, setLoading }:EditUserProps) => {
    const queryClient = useQueryClient()
    const onFinish = async (v:{}) => {
        console.log(v)
        try {
            setLoading(true)
            if(openUserModal?._id){
                const response = await updateUser(openUserModal._id, v)
                if (response.status === 200) {
                    message.success("User Updated Successfully")
                    queryClient.invalidateQueries(['users'])
                }    
            }
        } catch (err) {
            message.error("Something went wrong, Try Again")
        } finally {
            setLoading(false)
            closeUserModal()
        }
    }
    const onFinishFailed = (v:{}) => {
        console.log(v)
    }
    return (
        <Modal
            title={"Edit User"}
            open={openUserModal?._id ? true : false}
            onCancel={closeUserModal}
            footer={null}
        >
            <Form
                form={form}
                layout="vertical"
                className="px-5 mx-2"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: "Name is required!",
                        },
                    ]}
                >
                    <Input
                        placeholder="Enter Name"
                        size="large"
                    />
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: "email is required!",
                        },
                        { type: "email", message: "invalid email!" },
                    ]}
                >
                    <Input
                        placeholder="Email ID"
                        size="large"
                    />
                </Form.Item>
                <Form.Item
                    label="Address"
                    name="address"
                    rules={[
                        {
                            required: true,
                            message: "Address is required!",
                        },
                    ]}
                >
                    <Input
                        placeholder="Enter Address"
                        size="large"
                    />
                </Form.Item>

                <div className="flex justify-center">
                    <Button
                        type="primary"
                        className="w-100"
                        disabled={loading}
                        onClick={() => {
                            form.submit();
                        }}
                    >
                        Save
                    </Button>
                </div>
            </Form>
        </Modal>
    )
}

export default EditUser