import { useParams } from "react-router-dom";
import usePatientStore from "../store/usePatient";
import { Button } from "antd";
import Avatar from "../components/Avatar";
import PatientForm from "../components/PatientForm";
import { useEffect, useState } from "react";
import { getPatientInfo } from "@/api/patient.js";
import dateFormater from '@/utils/dateFormater.js';
/**
 * patient details form page
 * @returns
 */
export default function PatientDetail() {
  const [edit, setEdit] = useState(false);

  const { id } = useParams();
  // const patientStore = usePatientStore();
  // const data = patientStore[0].data[id];
  const data = JSON.parse(localStorage.getItem("list"))[id - 1];
  console.log('data',data);
  data.date_of_birth = data.date_of_birth.substring(0,10);
  console.log('data',data);
  useEffect(() => {
    getPatientInfo(id, parseInt(localStorage.getItem("therapistId"))).then(
      (res) => {
        console.log(res);
      },
    );
  }, []);
  const [patientData, setPatientData] = useState(data);
  const [img, setImg] = useState(data.avatar);
  /**
   * edit profile callback
   */
  const handleEdit = () => {
    setEdit(true);
  };
  /**
   * modify patient data callback
   * @param {e} value
   */
  const handleChage = (value) => {
    setPatientData(value);
  };

  return (
    <>
      <div className="bg-gray-500 w-full flex flex-col items-center flex-wrap">
        <div className="w-32 h-32 bg-red-500 mx-20 text-6xl flex flex-col justify-around items-center">
          <Avatar img={img} setImg={setImg} edit={edit} />
        </div>
        <div className="bg-green-300 flex-1 w-full flex flex-col justify-center items-center">
          <PatientForm
            info={patientData}
            edit={edit}
            setEdit={setEdit}
            handleChage={handleChage}
          />
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
