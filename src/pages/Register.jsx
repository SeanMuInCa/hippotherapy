import Logo from "../components/Logo";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
const App = () => {
  const [form] = Form.useForm();
  const nav = useNavigate();
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    nav("/login");
  };

  return (
    <>
      {/* <div className="mx-auto my-10 flex justify-center w-50 h-50">
        <Logo size="large"></Logo>
      </div> */}

      <Form
        labelCol={{
          span: 5,
        }}
        className="flex flex-col items-center my-10"
        form={form}
        name="register"
        onFinish={onFinish}
      >
        <Form.Item
          className="w-6/12"
          name="fName"
          label="First Name"
          rules={[
            {
              required: true,
              message: "Please input your first name",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="w-6/12"
          name="lName"
          label="Last Name"
          rules={[
            {
              required: true,
              message: "Please input your last name",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="w-6/12"
          name="phone"
          label="Contact Number"
          rules={[
            {
              required: true,
              message: "Please input your number",
            },
          ]}
        >
          <Input placeholder="123-123-1234" />
        </Form.Item>
        <Form.Item
          className="w-6/12"
          name="city"
          label="City"
          rules={[
            {
              required: true,
              message: "Please input your city",
            },
          ]}
        >
          <Input placeholder="Saskatoon" />
        </Form.Item>
        <Form.Item
          className="w-6/12"
          name="province"
          label="Province"
          rules={[
            {
              required: true,
              message: "Please input your province",
            },
          ]}
        >
          <Input placeholder="Saskatchewan" />
        </Form.Item>
        <Form.Item
          className="w-6/12"
          name="edu"
          label="Education"
          rules={[
            {
              required: true,
              message: "Please input your education",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="w-6/12"
          name="specialization"
          label="Specialization"
          rules={[
            {
              required: true,
              message: "Please input your specialization",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="w-6/12"
          name="train"
          label="Training"
          rules={[
            {
              required: true,
              message: "Please input your training",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="w-6/12"
          name="expertise"
          label="Expertise"
          rules={[
            {
              required: true,
              message: "Please input your expertise",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="w-6/12"
          name="experience"
          label="Years of Experience"
          rules={[
            {
              required: true,
              message: "Please input your years of experience",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="w-6/12"
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          className="w-6/12"
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          className="w-6/12"
          name="confirm"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The new password that you entered do not match!"),
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        {/* <Form.Item
          className="w-6/12 flex justify-center"
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(new Error("Should accept agreement")),
            },
          ]}
        >
          <Checkbox className="align-middle mx-auto">
            I have read the <a href="">agreement</a>
          </Checkbox>
        </Form.Item> */}

        <Form.Item className="w-6/12 flex justify-center">
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
export default App;
