import { Form, Input, Button, Select } from "antd";
const { Option } = Select;
const PatientForm = (props) => {
  return (
    <Form
      labelCol={{
        span: 5,
      }}
      className="flex flex-col items-center my-10"
      // form={form}
      name="profile"
      // onFinish={onFinish}
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
        name="birthday"
        label="Date of Birth"
        rules={[
          {
            required: true,
            message: "Please input your birthday",
          },
        ]}
      >
        <Input placeholder="yyyy/mm/dd" />
      </Form.Item>
      <Form.Item
        className="w-6/12"
        name="parent"
        label="Parent Name"
        rules={[
          {
            required: true,
            message: "Please input your parent name",
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
        name="gender"
        label="Gender"
        rules={[{ required: true, message: "Please select gender!" }]}
      >
        <Select placeholder="select your gender">
          <Option value="male">Male</Option>
          <Option value="female">Female</Option>
          <Option value="other">Other</Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="intro"
        label="Intro"
        rules={[
          {
            required: true,
            message: "Please input Intro",
          },
        ]}
      >
        <Input.TextArea showCount maxLength={100} />
      </Form.Item>
      <Form.Item className="w-6/12 flex justify-center">
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PatientForm;
