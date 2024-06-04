import { Input, Button, Form, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate, Link } from "react-router-dom";
import Logo from "@/components/Logo.jsx";
import useUserStore from "../store/userStore";
import { useEffect } from "react";
import { loginApi } from "@/api/user.js";
/**
 * login page
 * @returns
 */
export default function Login() {
  const [state, actions] = useUserStore.useStore();
  console.log(state, actions);
  const nav = useNavigate();
  /**
   * submit login data
   * @param {object} values login form data
   */
  const onFinish = (values) => {
    loginApi(values)
      .then((res) => {
        if (res.data.success) {
          message.success("Welcome Back Dr.");
          state.userId = res.data.userId;
          localStorage.setItem("therapistId", res.data.userId);
          nav("/home");
        } else {
          message.error("Invalid email or password");
        }
      })
      .catch(() => {
        message.error("Invalid email or password");
      });
      
    actions.setLoginStatus(true);
    localStorage.setItem("isLogin", true);
    
  };
  
  useEffect(() => {
    localStorage.removeItem("isLogin");
    
  }, []);
  const forgotPwd = () => {
    //call reset api
    message.info("your password has been reset");
  };
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
          label="Email"
          name="email"
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

        <Form.Item className="flex flex-col justify-center items-center">
          <Button type="primary" htmlType="submit" className="mx-4">
            Login
          </Button>
          <a
            className="underline block text-blue-500 text-center mt-2"
            onClick={forgotPwd}
          >
            forgot password
          </a>
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
