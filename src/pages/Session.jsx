import { Button } from "antd";
import { useParams } from "react-router-dom";
import usePatientStore from "@/store/usePatient.js";
import SessionList from "../components/SessionList";
import Chart from "../components/Chart";
import { useState } from "react";

const Session = () => {
  const [state, action] = usePatientStore.useStore();
  const { id } = useParams();
  console.log(state.data[id]);
  const patient = state.data[id];
  const goAssessment = () => {
    window.location.href = "/assessment/" + id;
  };
  const chartData1 = [
    {
      name: "assessment1",
      data: [1, 2, 4, 2, 3, 1, 2, 1, 3, 2, 5],
      type: "line",
    },
    {
      name: "assessment2",
      data: [2, 3, 3, 2, 3, 2, 2, 2, 3, 4, 3],
      type: "line",
    },
  ];
  const chartData2 = [
    {
      name: "assessment1",
      data: [1, 2, 4, 2, 3, 1, 2, 1, 3, 2, 5],
      type: "line",
    },
    {
      name: "assessment2",
      data: [2, 3, 3, 2, 3, 2, 2, 2, 3, 4, 3],
      type: "line",
    },
    {
      name: "assessment3",
      data: [2, 3, 4, 4, 3, 2, 2, 2, 3, 4, 3],
      type: "line",
    },
  ];
  const [chartData, setCharData] = useState(null);
  const chooseSession = (id) => {
    console.log(id);
    switch (id) {
      case "1":
        setCharData(chartData1);
        break;
      case "2":
        setCharData(chartData2);
        break;
      default:
        setCharData(null);
    }
    console.log(chartData);
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
      <p className="my-2 mx-auto text-center">Session List</p>
      <SessionList chooseSession={chooseSession} />
      {chartData && <Chart chartData={chartData} />}
      <div className="flex justify-center my-2">
        <Button type="primary" onClick={goAssessment}>
          new session
        </Button>
      </div>
    </>
  );
};

export default Session;
