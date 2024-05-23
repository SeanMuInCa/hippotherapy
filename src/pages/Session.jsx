import { Button, List } from "antd";
import { useParams } from "react-router-dom";
import usePatientStore from "@/store/usePatient.js";
const Session = () => {
  const [state, action] = usePatientStore.useStore();
  const { id } = useParams();
  console.log(state.data[id]);
  const patient = state.data[id];
  const goAssessment = () => {
    window.location.href = "/assessment/" + id;
  };
  return (
    <>
      <div className="flex justify-start mb-5 p-5 flex-col bg-slate-200">
        <p className="text-2xl mb-1">
          {patient.firstName} - {patient.lastName}
        </p>
        <p className="mb-1">Date of Birth: {patient.dateOfBirth}</p>
        <p className="mb-1">Gender: {patient.gender}</p>
        <p className="mb-1">Email: {patient.emailId}</p>
        <p className="mb-1">Guardian: {patient.guardianFirstName}</p>
        <p className="mb-1">Contact Number: {patient.contactNumber}</p>
      </div>
      <Button type="primary" onClick={goAssessment}>
        new assessment
      </Button>
    </>
  );
};

export default Session;
