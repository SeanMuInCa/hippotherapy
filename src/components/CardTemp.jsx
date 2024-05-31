import { Card } from "antd";
import { useNavigate } from "react-router-dom";
import usePatientStore from "../store/usePatient";
import Avatar from "./Avatar";
/**
 * this component is a card template of a patient's information
 * @param {props} -data contains specific patient's information
 * @returns
 */
export default function CardTemp(props) {
  const patientStore = usePatientStore();
  const nav = useNavigate();
  const data = props.data;
  console.log(props);
  const handleClick = (data) => {
    props.setChoose(true);
    console.log(data);
    nav(`/session/${data.id}`);
    patientStore[0].selected = data.id;
    console.log(patientStore[0].selected);
  };

  return (
    <>
      <Card
        title={data.firstName + " " + data.lastName}
        className="w-full h-full mb-2"
        size="small"
        extra={
          <a
            className="text-sky-600 underline font-bold"
            href={"/patient/" + data.id}
          >
            Edit Profile
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
            <p>{data.emailId}</p>
            <p>{data.contactNumber}</p>
            <p>{data.dateOfBirth}</p>
            <p>{data.guardianFirstName}</p>
          </div>
        </div>
      </Card>
    </>
  );
}
