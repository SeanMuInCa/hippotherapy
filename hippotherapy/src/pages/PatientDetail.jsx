import { useParams } from "react-router-dom";
import { Button } from "antd";
import { Avatar, PatientForm } from "../components";
import { useEffect, useState } from "react";
import { getPatientInfo } from "@/api";

/**
 * patient details form page
 * @returns
 */
export default function PatientDetail() {
  const [edit, setEdit] = useState(false);
  const [data, setData] = useState(null);
  const [patientData, setPatientData] = useState(null);
  const [img, setImg] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    getPatientInfo(id, parseInt(localStorage.getItem("therapistId"))).then(
      (res) => {
        const patientData = res.data.patientData[0];
        if (patientData) {
          patientData.date_of_birth = patientData.date_of_birth.substring(0, 10);
          setData(patientData);
        }
      },
    );
  }, [id]);

  useEffect(() => {
    if (data) {
      setPatientData(data);
      setImg(data.avatar);
    }
  }, []);

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
  const handleChange = (value) => {
    setPatientData(value);
  };

  return (
    data && (
      <>
        <div className="bg-gray-500 w-full flex flex-col items-center flex-wrap">
          <div className="w-32 h-32 bg-red-500 mx-20 text-6xl flex flex-col justify-around items-center">
            <Avatar img={data.avatar} setImg={setImg} edit={edit} />
          </div>
          <div className="bg-green-300 flex-1 w-full flex flex-col justify-center items-center">
            <PatientForm
              info={data}
              edit={edit}
              setEdit={setEdit}
              handleChange={handleChange}
            />
            {!edit && (
              <Button type="primary" onClick={handleEdit}>
                Edit Profile
              </Button>
            )}
          </div>
        </div>
      </>
    )
  );
}
