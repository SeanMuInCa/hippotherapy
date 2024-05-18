import { useParams } from "react-router-dom";
import usePatientStore from "../store/usePatient";
import { Button } from "antd";
import Avatar from "../components/Avatar";
import PatientForm from "../components/PatientForm";
import { useState } from "react";
import avatar from "../utils/getAvatar";

export default function PatientDetail() {
  const [edit, setEdit] = useState(false);
  
  const { id } = useParams();
  const patientStore = usePatientStore();
  const data = patientStore[0].data[id];
  const [img, setImg] = useState(data.avatar);
  const handleEdit = () => {
    setEdit(true);
  };
  const newAvatar = () => {
    const newImg = avatar();
    setImg(newImg);
  };
  return (
    <>
      <div className="bg-gray-500 w-full flex flex-col items-center flex-wrap">
        <div className="w-32 h-32 bg-red-500 mx-20 text-6xl flex flex-col justify-around items-center">
          <Avatar img={img} />
          {edit && (
            <Button size="small" onClick={newAvatar}>
              Change one
            </Button>
          )}
        </div>
        <div className="bg-green-300 flex-1 w-full flex flex-col justify-center items-center">
          {/* {Object.keys(data).map((key, index) => (
            <p className="p-2" key={index}>
              {key}: {data[key]}
            </p>
          ))} */}
          <PatientForm info={data} edit={edit} setEdit={setEdit} />
          {!edit && (
            <Button type="primary" onClick={handleEdit}>
              Edit Profile
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
