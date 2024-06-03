import { Form, Input, Button, Select, message, DatePicker } from "antd";
import { useNavigate } from "react-router-dom";
import { addNewPatient } from "@/api/patient.js";
import dateFormater from "@/utils/dateFormater.js";
const { Option } = Select;

/**
 * this is the patient form component
 * @param {props } - if type is add means add new patient else means edit patient
 * @returns
 */
const PatientForm = (props) => {
  const nav = useNavigate();
  const onFinish = (values) => {
    console.log("value", values);
    if (props.type === "add") {
      console.log("value", values);
      values.avatar = props.img;
      values.therapistId = parseInt(localStorage.getItem("userId"));
      values.dateOfBirth = dateFormater(values.dateOfBirth.$d);
      addNewPatient(values).then((res) => {
        console.log(res);
        if (res.data.success) {
          message.success("added successfully");
          nav("/patient");
          nav(0);
        }
      });
      // patientStore[0].data.push(values);
      // nav("/patient");
      return;
    } else {
      props.handleChage(values);
    }
    props.setEdit(false);
  };
  console.log(props);
  return (
    <Form
      labelCol={{
        span: 5,
      }}
      className="flex flex-col items-center my-5"
      // form={form}
      name="profile"
      onFinish={onFinish}
      initialValues={props.info}
    >
      <Form.Item
        className="w-9/12 flex flex-row"
        name="firstName"
        label="First Name"
        rules={[
          {
            required: true,
            message: "Please input your first name",
          },
        ]}
      >
        <Input
          disabled={!props.edit}
          initialvalue={props.info.fName}
          value={props.info.fName}
        />
      </Form.Item>
      <Form.Item
        className="w-9/12"
        name="lastName"
        label="Last Name"
        rules={[
          {
            required: true,
            message: "Please input your last name",
          },
        ]}
      >
        <Input disabled={!props.edit} initialvalue={props.info.lName} />
      </Form.Item>
      <Form.Item
        className="w-9/12"
        name="contactNumber"
        label="Contact Number"
        rules={[
          {
            required: true,
            message: "Please input your number",
          },
        ]}
      >
        <Input
          placeholder="123-123-1234"
          disabled={!props.edit}
          initialvalue={props.info.number}
        />
      </Form.Item>
      {props.type === "add" ? (
        <Form.Item
          label="Date of Birth"
          className="w-9/12"
          name="dateOfBirth"
          rules={[
            {
              required: true,
              message: "Please input your birthday",
            },
          ]}
        >
          <DatePicker />
        </Form.Item>
      ) : (
        <Form.Item
          className="w-9/12"
          name="dateOfBirth"
          label="Date of Birth"
          rules={[
            {
              required: true,
              message: "Please input your birthday",
            },
          ]}
        >
          <Input
            placeholder="yyyy/mm/dd"
            disabled={!props.edit}
            initialvalue={props.info.birth}
          />
        </Form.Item>
      )}

      <Form.Item
        className="w-9/12"
        name="guardianFirstName"
        label="Parent Name"
        rules={[
          {
            required: true,
            message: "Please input your parent name",
          },
        ]}
      >
        <Input disabled={!props.edit} initialvalue={props.info.parent} />
      </Form.Item>
      <Form.Item
        className="w-9/12"
        name="emailId"
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
        <Input disabled={!props.edit} initialvalue={props.info.email} />
      </Form.Item>
      <Form.Item
        className="w-9/12"
        name="gender"
        label="Gender"
        rules={[{ required: true, message: "Please select gender!" }]}
      >
        <Select
          placeholder="select your gender"
          disabled={!props.edit}
          initialvalue={props.info.gender}
        >
          <Option value="male">Male</Option>
          <Option value="female">Female</Option>
          <Option value="other">Other</Option>
        </Select>
      </Form.Item>
      <Form.Item
        className="w-9/12"
        name="medicalHistory"
        label="Intro"
        rules={[
          {
            required: true,
            message: "Please input Intro",
          },
        ]}
      >
        <Input.TextArea
          showCount
          maxLength={500}
          disabled={!props.edit}
          initialvalue={props.info.history}
        />
      </Form.Item>
      {props.edit && (
        <Form.Item className="w-6/12 flex justify-center">
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      )}
    </Form>
  );
};

export default PatientForm;
