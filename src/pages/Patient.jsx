import { useState, useEffect } from "react";
import CardTemp from "../components/CardTemp";
import { getPatientList } from "@/api/patient.js";
import { getInfo } from "@/api/user.js";

/**
 * landing page for therapist
 * @returns
 */
export default function Patient() {
  const [patients, setPatients] = useState([]);
  const getList = async () => {
    const res = await getPatientList(
      parseInt(localStorage.getItem("therapistId")),
    );
    console.log(res);
    if (res.data.success) {
      const patientList = res.data.patientList;
      localStorage.setItem("list", JSON.stringify(patientList));
      setPatients(patientList);
    }
  };
  const getTherapyInfo = async () => {
    const res = await getInfo(localStorage.getItem("therapistId"));
    if (res.status == 200) {
      localStorage.setItem(
        "therapist",
        JSON.stringify(res.data.therapistDetails[0]),
      );
    }
  };
  useEffect(() => {
    getList();
    getTherapyInfo();
  }, []);

  useEffect(() => {
    console.log("patient", patients);
  }, [patients]);
  const [choose, setChoose] = useState(false);
  if (choose)
    return <>{/* <PatientDetail data={patients}></PatientDetail> */}</>;
  else
    return (
      <>
        <div className="flex flex-wrap">
          {patients.map((item, i) => (
            <CardTemp key={i} data={item} setChoose={setChoose}></CardTemp>
          ))}
        </div>
      </>
    );
}
