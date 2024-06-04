import { Button, Form, Input, InputNumber, message } from "antd";
import { useNavigate } from "react-router-dom";
import { registerApi, updateInfo } from "@/api/user.js";
/**
 * this is the therapy's profile form
 * @param {props} - if the type is register the form is used in register page else it is used in edit profile page
 * @returns
 */
const TherapyForm = (props) => {
  const [form] = Form.useForm();
  const nav = useNavigate();
  /**
   * submit form function
   * @param {obj} values form data
   */
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    if (props.type === "register") {
      registerApi(values)
        .then((res) => {
          console.log(res);
          if (res.data.success) {
            nav("/login");
            message.success("register successfully");
          } else {
            message.error("something went wrong");
          }
        })
        .catch((err) => {
          console.log(err);
          message.error("something went wrong");
        });
    } else {
      //Todo: update profile
      // const therapistId = localStorage.getItem("therapistId");
      updateInfo( values).then((res) => {
        if (res.status == 200) {
          message.success(res.data.message);
          console.log("before edit", values);
          localStorage.setItem("therapist", JSON.stringify(values));
          // nav("/patient");
        } else {
          message.error(res.data.message);
        }
      });
    }
  };
  return (
    <Form
      labelCol={{
        span: 5,
      }}
      className="flex flex-col items-center my-5"
      form={form}
      name="register"
      onFinish={onFinish}
      initialValues={props.data}
    >
      <Form.Item
        className="w-6/12"
        name="first_name"
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
        name="last_name"
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
        name="contact_number"
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
        name="education"
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
        name="training"
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
        name="years_of_experience"
        label="Years of Experience"
        rules={[
          {
            required: true,
            message: "Please input your years of experience",
          },
        ]}
      >
        <InputNumber />
      </Form.Item>
      {/* <Form.Item
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
      </Form.Item> */}

      {props.type === "register" && (
        <>
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
                    new Error(
                      "The new password that you entered do not match!",
                    ),
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
        </>
      )}
      <Form.Item className="w-6/12 flex justify-center">
        <Button type="primary" htmlType="submit">
          {props.type === "register" ? "Register" : "Update"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TherapyForm;
