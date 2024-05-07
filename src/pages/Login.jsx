import { Input, Button, Form } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from '@/components/Logo.jsx';

export default function Login() {
  const nav = useNavigate();
  const onFinish = (values) => {
    nav("/home");
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
	return (
    <>
    <div className="mx-auto my-10 flex justify-center w-50 h-50">
    <Logo size='large'></Logo>
    </div>
		<Form className="flex flex-col mx-auto my-20 justify-center items-center w-full"
			name="basic"
			labelCol={{
				span: 200,
			}}
			
			style={{
				maxWidth: 1920,
			}}
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
			autoComplete="off"
		>
			<Form.Item
      className="w-6/12"
				label="Username"
				name="username"
				rules={[
					{
						required: true,
						message: "Please input your username!",
					},
				]}
			>
				<Input />
			</Form.Item>

			<Form.Item
      className="w-6/12"
				label="Password"
				name="password"
				rules={[
					{
						required: true,
						message: "Please input your password!",
					},
				]}
			>
				<Input.Password />
			</Form.Item>



			<Form.Item
				wrapperCol={{
					offset: 8,
					span: 16,
				}}
			>
				<Button  type="primary" htmlType="submit">
					Submit
				</Button>
			</Form.Item>
		</Form>
    </>
	);
}
