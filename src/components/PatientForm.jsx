import { Form, Input, Button, Select, message, DatePicker } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { addNewPatient, updatePatientProfile } from "@/api";
import dateFormater from "@/utils/dateFormater.js";
import dayjs from "dayjs";
import { useState } from "react";
const { Option } = Select;

/**
 * this is the patient form component
 * @param {props } - if type is add means add new patient else means edit patient
 * @returns
 */
const PatientForm = (props) => {
  const params = useParams();
  console.log(params);
  const nav = useNavigate();
  const dateFormat = "YYYY-MM-DD";
  const [dateString, setDateString] = useState("");
  const handleDateChange = (date) => {
    setDateString(dateFormater(date.$d));
  };
  const onFinish = (values) => {
    if (props.type === "add") {
      const date = dateFormater(values.date_of_birth.$d);
      values.avatar = props.img;
      values.therapist_id = parseInt(localStorage.getItem("therapistId"));
      values.date_of_birth = date;
      addNewPatient(values).then((res) => {
        if (res.data.success) {
          message.success("added successfully");
          nav("/session/" + res.data.patientId);
          // nav(0);
        }
      });
      return;
    } else {
      values.avatar = props.info.avatar;
      values.therapist_id = parseInt(localStorage.getItem("therapistId"));
      values.date_of_birth =
        dateString.length == 0 ? props.info.date_of_birth : dateString;
      //bug
      values.patient_id = parseInt(params.id);
      updatePatientProfile(values).then((res) => {
        console.log(values);
        if (res.status == 200) {
          message.success(res.data.message);
        }
      });
    }
    props.setEdit(false);
  };
  return (
    <Form
      labelCol={{
        span: 5,
      }}
      className="flex flex-col items-center my-5"
      name="profile"
      onFinish={onFinish}
      initialValues={props.info}
    >
      <Form.Item
        className="w-9/12 flex flex-row"
        name="first_name"
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
        name="last_name"
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
        name="contact_number"
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
          name="date_of_birth"
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
          label="Date of Birth"
          rules={[
            {
              required: true,
              message: "Please input your birthday",
            },
          ]}
        >
          <DatePicker
            defaultValue={dayjs(props.info.date_of_birth, dateFormat)}
            disabled={!props.edit}
            onChange={handleDateChange}
          />
        </Form.Item>
      )}

      <Form.Item
        className="w-9/12"
        name="guardian_first_name"
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
        name="email_id"
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
        name="medical_history"
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
