import { useState } from "react";
import CardTemp from "../components/CardTemp";
import usePatientStore from "../store/usePatient";
import PatientDetail from "./PatientDetail";
export default function Patient() {
  const patientStore = usePatientStore();
  console.log(patientStore);
  const patients = patientStore[0].data;
  const [choose, setChoose] = useState(false);
  if (choose)
    return (
      <>
        {/* <PatientDetail data={patients}></PatientDetail> */}
      </>
    );
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
