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
  /**
   * callback of click the card
   * @param {object} data patient information from back-end
   */
  const handleClick = (data) => {
    props.setChoose(true);
    nav(`/session/${data.patient_id}`);
    patientStore[0].selected = data.patient_id;
  };

  return (
    <>
      <Card
        title={data.first_name + " " + data.last_name}
        className="w-full h-full mb-2"
        size="small"
        extra={
          <a
            className="text-sky-600 underline font-bold"
            href={"/patient/" + data.patient_id}
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
            <p>{data.email_id}</p>
            <p>{data.contact_number}</p>
            <p>{data.date_of_birth.substring(0, 10)}</p>
            <p>{data.guardian_first_name}</p>
          </div>
        </div>
      </Card>
    </>
  );
}
