import { useParams } from "react-router-dom";
import usePatientStore from "../store/usePatient";
import { Button } from "antd";
import Avatar from "../components/Avatar";
import PatientForm from "../components/PatientForm";
export default function PatientDetail(props) {
  const { id } = useParams();
  const patientStore = usePatientStore();
  console.log(patientStore[0].data);
  const data = patientStore[0].data[id];
  console.log(props);
  console.log(data);
  return (
    <>
      <div className="bg-gray-500 w-full flex flex-col items-center flex-wrap">
        <div className="w-32 h-32 bg-red-500 mx-20 text-6xl flex justify-around items-center">
          <Avatar />
        </div>
        <div className="bg-green-300 flex-1 w-full">
          {/* {Object.keys(data).map((key, index) => (
            <p className="p-2" key={index}>
              {key}: {data[key]}
            </p>
          ))} */}
          <PatientForm />
          <Button type="primary" className="mt-5">
            Edit Profile
          </Button>
        </div>
      </div>
    </>
  );
}
