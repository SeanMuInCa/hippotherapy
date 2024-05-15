import { Card } from "antd";
import { useNavigate } from "react-router-dom";
import usePatientStore from "../store/usePatient";
import PatientDetail from "@/pages/PatientDetail";
export default function CardTemp(props) {
  const patientStore = usePatientStore();
  const nav = useNavigate();
  const data = props.data;
  const handleClick = (data) => {
    console.log(data);
    // nav(`/patient/${data.id}`);
    patientStore[0].selected = data.id;
    console.log(patientStore[0].selected);
  };
  return (
    <>
      <Card title="Patient" style={{ width: 300, margin: 10 }}>
        <div
          className="flex justify-evenly cursor-pointer"
          onClick={() => handleClick(data)}
        >
          <div className="bg-red-500 flex-2 rounded-xl w-18 h-18 text-center leading-normal text-5xl font-bold px-1">
            {data.fName.toUpperCase().charAt(0)}{" "}
            {data.lName.toUpperCase().charAt(0)}
          </div>
          <div className=" flex-1 px-5 py-2">
            <p>{data.email}</p>
            <p>{data.language}</p>
            <p>{data.location}</p>
          </div>
        </div>
      </Card>
      <PatientDetail id={patientStore[0].selected}></PatientDetail>
    </>
  );
}
