import { useParams } from "react-router-dom";
import usePatientStore from "../store/usePatient";
export default function PatientDetail() {
  const { id } = useParams();
  const patientStore = usePatientStore();
  const data = patientStore[0].data[id];

  console.log(data);
  return (
    <div className="bg-gray-500 w-full p-20">
      <div className="w-32 h-32 bg-red-500 mx-20 text-6xl flex justify-around items-center">
        <div>{data.fName.toUpperCase().charAt(0)}</div>
        <div>{data.lName.toUpperCase().charAt(0)}</div>
      </div>
      <div className="bg-green-300"></div>
    </div>
  );
}
