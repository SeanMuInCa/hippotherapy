import PatientForm from "./PatientForm";
import { useState } from "react";
import Avatar from "./Avatar";
import avatar from "../utils/getAvatar";
/**
 * this component is the new patient, it contains a form sub component
 * @returns
 */
const NewPatient = () => {
  const [newPatient, setNewPatient] = useState({
    fName: "",
    lName: "",
    number: "",
    birth: "",
    parent: "",
    email: "",
    gender: "",
    history: "",
    avatar: avatar(),
  });
  const [img, setImg] = useState(newPatient.avatar);
  return (
    <>
      <p className="text-center mb-5">Add a new patient</p>
      <div className="flex justify-center flex-col items-center">
        <Avatar img={img} edit={true} setImg={setImg} />
      </div>
      <PatientForm info={newPatient} edit={true} type="add" img={img} />
    </>
  );
};

export default NewPatient;
