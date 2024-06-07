import { Form, Input, Button } from "antd";

const Security = () => {
  let question = "What is your mother's maiden name?";
  const onFinish = (values) => {
    console.log(values);
  };
  return (
    <Form onFinish={onFinish}>
      <Form.Item
        name="email"
        label="Your Email"
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
        name="answer"
        label="Answer of your security question"
        rules={[
          {
            required: true,
            message: "Please input your answer",
          },
        ]}
      >
        <div>
          <p className="text-red-400">{question}</p>
          <Input />
        </div>
      </Form.Item>
      <Form.Item className=" flex justify-center">
        <Button type="primary" htmlType="submit">
          Reset Password
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Security;
