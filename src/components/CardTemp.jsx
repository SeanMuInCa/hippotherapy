import { Card } from "antd";
import { useNavigate } from "react-router-dom";
import usePatientStore from "../store/usePatient";
import Avatar from "./Avatar";
export default function CardTemp(props) {
  const patientStore = usePatientStore();
  const nav = useNavigate();
  const data = props.data;
  console.log(props);
  const handleClick = (data) => {
    props.setChoose(true);
    console.log(data);
    nav(`/patient/${data.id}`);
    patientStore[0].selected = data.id;
    console.log(patientStore[0].selected);
  };

  return (
    <>
      <Card
        title={data.fName + " " + data.lName}
        className="w-full h-full mb-2"
        size="small"
        extra={
          <a
            className="text-sky-600 underline font-bold"
            href={"/session/" + data.id}
          >
            Assessment
          </a>
        }
      >
        <div
          className="flex justify-evenly cursor-pointer"
          onClick={() => handleClick(data)}
        >
          <div className="bg-red-500 flex-2 rounded-xl w-18 h-18 text-center leading-normal text-5xl font-bold p-1">
            <Avatar img={data.avatar}></Avatar>
          </div>
          <div className=" flex-1 px-5 py-2">
            <p>{data.email}</p>
            <p>{data.number}</p>
            <p>{data.birth}</p>
          </div>
        </div>
      </Card>
    </>
  );
}
