import { useState } from "react";
import {TherapyForm} from "../components";
import { Link } from "react-router-dom";
/**
 * register page
 * @returns
 */
const Register = () => {
  // eslint-disable-next-line no-unused-vars
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    contactNumber: "",
    city: "",
    province: "",
    education: "",
    specialization: "",
    training: "",
    expertise: "",
    yearsOfExperience: "",
    email: "",
    password: "",
  });
  return (
    <>
      <TherapyForm data={newUser} type="register" />
      <div className="mx-auto text-center">
        Already have an account?
        <Link to={"/login"} className="underline ml-4 text-blue-400">
          Login
        </Link>{" "}
      </div>
    </>
  );
};
export default Register;
