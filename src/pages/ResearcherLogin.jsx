import { Input, Button, Form } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Logo from "@/components/Logo.jsx";
import useUserStore from "../store/userStore";
export default function ResearcherLogin() {
  const [state, actions] = useUserStore.useStore();
  console.log(state, actions);
  const nav = useNavigate();
  const onFinish = (values) => {
    console.log(values);
    state.role = "researcher";
    actions.setLoginStatus(true);
    localStorage.setItem("isLogin", true);
    localStorage.setItem("role", "researcher");
    nav("/researcherhome");
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
    </>
  );
}
