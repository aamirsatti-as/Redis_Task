import React, { useState, useContext } from "react";
import { Button, Form, Input, message } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../authContext";
const LoginForm = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }
  const { handleLogin } = authContext

  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate()
  const onFinish = async (v: {}) => {
    console.log(v)
    setLoading(true)
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/login`, v)
      if (response.status === 200) {
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('userId', response.data.user._id)
        message.success("Login Successfull")
        handleLogin()
        navigate('/dashboard/users')
      }
    } catch (err: any) {
      if (err?.response?.status === 404) {
        message.error(err.response.data.error)

      }
      else if (err?.response?.status === 403) {
        message.error(err.response.data.error)
      } else {
        message.error("Something Went Wrong, Try Again")
      }
    } finally {
      setLoading(false)
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
            // prefix={<LockIcon />}
            />
          </Form.Item>

          <div className="flex justify-center">
            <Button
              type="primary"
              className="w-100"
              disabled={loading}
              onClick={() => {
                console.log('inside')
                form.submit();
              }}
            >
              Log in
            </Button>
          </div>
          <div className="flex justify-center mt-4">
            <span>Don't have an account? </span>
            <div onClick={()=>navigate('/signup')} className="ml-2 text-blue-500 cursor-pointer">
              Sign up
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
