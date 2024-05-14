import { useParams } from "react-router-dom";
import usePatientStore from "../store/usePatient";
export default function PatientDetail() {
  const { id } = useParams();
  const patientStore = usePatientStore();
  const data = patientStore[0].data[id];

  console.log(data);
  return <div>PatientDetail</div>;
}
