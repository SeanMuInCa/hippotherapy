import { Input, Button, Form, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate,Link } from "react-router-dom";
import Logo from "@/components/Logo.jsx";
import { researcherLogin } from "@/api/researcher.js";
import useUserStore from "../store/userStore";
/**
 * login page for researcher
 * @returns
 */
export default function ResearcherLogin() {
  const [state, actions] = useUserStore.useStore();
  const nav = useNavigate();
  /**
   * submit callback of login
   * @param {object} values email&password
   */
  const onFinish = async (values) => {
    console.log(values);
    const res = await researcherLogin(values);
    if (res.status == 200) {
      actions.setLoginStatus(true);
      localStorage.setItem("isLogin", true);
      localStorage.setItem("last_name", "Mylena");
      message.success("Welcome Back Mylena");
      nav("/researcherhome");
    }
  };

  return (
    <>
      <div className="mx-auto text-2xl my-10 flex flex-col items-center justify-center w-50 h-50">
        <Logo size="large"></Logo>
        <p>Login for researcher</p>
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
          label="E-mail"
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

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
      <div className="mx-auto my-5 text-center">
        Login as therapist? Click{" "}
        <Link to={"/login"} className="underline text-blue-400">
          Here
        </Link>{" "}
      </div>
    </>
  );
}
