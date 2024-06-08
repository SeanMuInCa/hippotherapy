import { Form, Input, Button,message } from "antd";
import { forgetPassword } from "../api/user";
import { useNavigate } from "react-router-dom";
// 编码
function encodeBase64(text) {
  return btoa(new TextEncoder().encode(text).reduce((data, byte) => data + String.fromCharCode(byte), ''));
}
const Security = (props) => {
  let question = "What is your mother's maiden name?";
  const nav = useNavigate();
  const onFinish = async(values) => {
    const res = await forgetPassword(values);
    if(res.status == 200){
        console.log(res);
        message.success("Password reset successfully");
        nav(/resetresult/ + encodeBase64(res.data.password));
    }else{
        message.error("Something went wrong");
    }
    props.setModal1Open(false);
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
