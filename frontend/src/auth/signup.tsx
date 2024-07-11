import React, { useState } from "react";
import { Button, Form, Input, message } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const LoginForm = () => {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const navigate = useNavigate()
    const onFinish = async (v: {}) => {
        console.log(v)
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/signup`, v)
            if (response.status === 200) {
                navigate('/login')
                message.success("Sign up Successfull")
            }
        } catch (err: any) {
            if (err?.response?.status === 409) {
                message.error(err.response.data.error)
            }
            else {
                message.error("Something Went Wrong, Try Again")
            }
        }
    };
    const onFinishFailed = (v: {}) => {
        console.log(v)
    }
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-gray-100 px-4 py-10 rounded w-1/2">
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
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Please input your password!",
                            },
                            {
                                validator: (_, value) => {
                                    if ((value && value.length < 8) || value.length > 16) {
                                        return Promise.reject(
                                            "Password must be between 8 to 16 characters long"
                                        );
                                    }
                                    return Promise.resolve();
                                },
                                message: "Password must be between 8 to 16 characters long",
                            },
                        ]}
                    >
                        <Input.Password
                            placeholder="Password"
                            className="inputStyle"
                            iconRender={(visible) =>
                                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                            }
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
                            Sign up
                        </Button>
                    </div>
                    <div className="flex justify-center mt-4">
                            <span>Already have an account? </span>
                            <div onClick={() => navigate('/login')} className="ml-2 text-blue-500 cursor-pointer">
                                Login
                            </div>
                        </div>
                </Form>
            </div>
        </div>
    );
};

export default LoginForm;
