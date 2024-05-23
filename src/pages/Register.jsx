import { useState } from "react";
import TherapyForm from "../components/TherapyForm";
const Register = () => {
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
    <TherapyForm data={newUser} type='register'/>
  );
};
export default Register;
