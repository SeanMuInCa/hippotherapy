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
  const chartData3 = [
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
    {
      name: "assessment4",
      data: [2, 3, 4, 4, 3, 2, 2, 2, 3, 4, 3],
      type: "line",
    },
  ];
  const [chartData, setCharData] = useState(null);
  const [mapping, setMapping] = useState({
    1: chartData1,
    2: chartData2,
    3: chartData3,
  });
  const chooseSession = (id, end) => {
    console.log(id);
    if (end) {
      setCharData(mapping[id]);
    } else {
      goAssessment();
    }
  };
  return (
    <>
      <div className="flex justify-start mb-5 p-5 flex-col bg-slate-200">
        <p className="text-2xl mb-1">
          {patient.firstName} - {patient.lastName}
        </p>
        <p className="mb-1 flex">
          <span className="min-w-44">Date of Birth:</span>{" "}
          <span>{patient.dateOfBirth}</span>
        </p>
        <p className="mb-1 flex">
          <span className="min-w-44">Gender:</span>{" "}
          <span>{patient.gender}</span>
        </p>
        <p className="mb-1 flex">
          <span className="min-w-44">Email:</span> {patient.emailId}
        </p>
        <p className="mb-1 flex">
          <span className="min-w-44">Guardian: </span>
          {patient.guardianFirstName}
        </p>
        <p className="mb-1 flex">
          <span className="min-w-44">Contact Number:</span>{" "}
          {patient.contactNumber}
        </p>
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
