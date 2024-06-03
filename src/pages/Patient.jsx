import { useState, useEffect } from "react";
import CardTemp from "../components/CardTemp";
import usePatientStore from "../store/usePatient";
/**
 * landing page for therapist
 * @returns
 */
export default function Patient() {
  const [patientState, patientAction] = usePatientStore.useStore();
  useEffect(() => {
    localStorage.removeItem("list");
    patientAction.getList(parseInt(localStorage.getItem("therapistId")));
  }, []);
  // const patientStore = usePatientStore();
  // const patients = patientStore[1].getList(parseInt(localStorage.getItem('therapistId')));
  // console.log(patients);
  const [choose, setChoose] = useState(false);
  const patients = JSON.parse(localStorage.getItem("list"));
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
