import { Input, Button, Form } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate, Link } from "react-router-dom";
import Logo from "@/components/Logo.jsx";
import useUserStore from "../store/userStore";
import { useEffect } from "react";
import { loginApi } from "@/api/user.js";
export default function Login() {
  const [state, actions] = useUserStore.useStore();
  console.log(state, actions);
  const nav = useNavigate();
  const onFinish = (values) => {
    console.log(values);
    loginApi(values).then((res) => {
      console.log(res);
      // nav("/home");
    });
    actions.setLoginStatus(true);
    localStorage.setItem("isLogin", true);
  };
  useEffect(() => {
    localStorage.removeItem("isLogin");
  }, []);
  return (
    <>
      <div className="mx-auto my-10 flex justify-center w-50 h-50 flex-col items-center text-2xl">
        <Logo size="large"></Logo>
        <p>Login for therapists</p>
      </div>
      <Form
        labelAlign="left"
        className="flex flex-col items-center w-full"
        name="basic"
        onFinish={onFinish}
        labelCol={{
          span: 3,
        }}
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
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
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
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
      <div className="mx-auto my-5 text-center">
        Login as researcher? Click{" "}
        <Link to={"/researcherlogin"} className="underline text-blue-400">
          Here
        </Link>{" "}
        or{" "}
        <Link to={"/register"} className="underline text-red-500">
          Sign Up
        </Link>
      </div>
    </>
  );
}
