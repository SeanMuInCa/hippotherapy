import CardTemp from "../components/CardTemp";
import usePatientStore from "../store/usePatient";
import PatientDetail from "./PatientDetail";
export default function Patient() {
  const patientStore = usePatientStore();
  console.log(patientStore);
  const patients = patientStore[0].data;
  if(patients.length)
  return (
    <>
      <div className="flex mx-5 flex-wrap">
        {patients.map((item, i) => (
          <CardTemp key={i} data={item}></CardTemp>
        ))}
      </div>
      
    </>
  );
}
