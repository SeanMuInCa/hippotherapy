import { Button, message } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import {SessionList,Chart} from "../components";
import { useEffect, useState } from "react";
import {
  getSessionByPatientAndTherapist,
  newSession,
  getSessionInfo,
} from "../api";
/**
 * patient's detail with session list
 * @returns
 */
const Session = () => {
  const [key, setKey] = useState(0); //sub components refresh by force
  const { id } = useParams();
  const patientId = id;
  const [isLoading, setIsLoading] = useState(true);
  const [sessionData, setSessionData] = useState();
  const nav = useNavigate();

  const [patient, setPatient] = useState();
  const getSession = async () => {
    const res = await getSessionByPatientAndTherapist(
      patientId,
      JSON.parse(localStorage.getItem("therapistId")),
    );

    if (res.status == 200) {
      setPatient(res.data.patientData[0]);
      setSessionData(res.data.sessionData);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getSession();
  }, [key]);
  const handleMessage = () => {
    message.info("you have unfinished session");
  };
  /**
   * start a new assessment in specific session
   * @param {number} sessionId
   */
  const goAssessment = (sessionId) => {
    nav("/assessment/" + patientId + "/" + sessionId);
  };
  const titleEnum = {
    0: "head",
    1: "trunk",
    2: "pelvic",
    3: "head_ant",
    4: "thoracic",
    5: "lumbar",
    6: "trunk_inclination",
    7: "pelvic_tilt",
    8: "hip",
    9: "knee",
    10: "elbow",
  };

  const [chartData, setCharData] = useState(null);
  /**
   * callback of select a session
   * @param {number} sessionId
   * @param {boolean} end end flag
   */
  const chooseSession = async (sessionId, end) => {
    const res = await getSessionInfo(sessionId);
    console.log(res);
    const result = [];
    for (let index = 0; index < res.data.data.length; index++) {
      const targetData = {
        name: "assessment",
        data: [],
        type: "line",
      };
      const element = res.data.data[index];
      const resultArray = Object.keys(titleEnum).map(
        (key) => element[titleEnum[key]],
      );
      targetData.data = resultArray;
      targetData.name = "assessment" + (index + 1);
      result.push(targetData);
    }

    if (end) {
      setCharData(result);
    } else {
      goAssessment(sessionId);
    }
  };
  /**
   * callback of click start new session
   * if there is no unfinished session then can start a new one
   */
  const sessionObj = {
    patientId: parseInt(patientId),
    therapistId: parseInt(localStorage.getItem("therapistId")),
    sessionDate: new Date().toISOString().slice(0, 10),
  };
  console.log(sessionObj);
  const startNewSession = async () => {
    let unfinished = sessionData.find((item) => item.end_session === 0);
    if (unfinished) {
      handleMessage();
    } else {
      const res = await newSession(sessionObj);
      console.log("startnewsession", res);
      setKey((prevKey) => prevKey + 1);
    }
  };
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div className="flex justify-start mb-5 p-5 flex-col bg-slate-200">
        <p className="text-2xl mb-1">
          {patient.first_name} - {patient.last_name}
        </p>
        <p className="mb-1 flex">
          <span className="min-w-44">Gender:</span>{" "}
          <span>{patient.gender}</span>
        </p>
        <p className="mb-1 flex">
          <span className="min-w-44">Email:</span> {patient.email_id}
        </p>
        <p className="mb-1 flex">
          <span className="min-w-44">Guardian: </span>
          {patient.guardian_first_name}
        </p>
        <p className="mb-1 flex">
          <span className="min-w-44">Contact Number:</span>{" "}
          {patient.contact_number}
        </p>
      </div>
      <p className="my-2 mx-auto text-center">Session List</p>
      <SessionList
        key={key}
        chooseSession={chooseSession}
        patientId={patientId}
        sessionData={sessionData}
      />
      {chartData && <Chart chartData={chartData} />}
      <div className="flex justify-center my-2">
        <Button type="primary" onClick={startNewSession}>
          New Session
        </Button>
      </div>
    </>
  );
};

export default Session;
