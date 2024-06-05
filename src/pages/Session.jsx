import { Button, message } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import usePatientStore from "@/store/usePatient.js";
import SessionList from "../components/SessionList";
import Chart from "../components/Chart";
import { useEffect, useState } from "react";
import useSessionStore from "../store/useSession";
import { getSessionByPatientAndTherapist, newSession } from "../api/session";
/**
 * patient's detail with session list
 * @returns
 */
const Session = () => {
  const [sessionState, sessionActions] = useSessionStore.useStore();
  const [key, setKey] = useState(0); //sub components refresh by force
  const { id } = useParams();
  const patientId = id;
  const [isLoading, setIsLoading] = useState(true);
  const [sessionData, setSessionData] = useState();
  const nav = useNavigate();
  // console.log("id", state.data[patientId]);
  // const patient = state.data[patientId];
  const [patient, setPatient] = useState();
  const getSessionInfo = async () => {
    const res = await getSessionByPatientAndTherapist(
      patientId,
      JSON.parse(localStorage.getItem("therapistId")),
    );
    console.log("res", res);
    if (res.status == 200) {
      setPatient(res.data.patientData[0]);
      setSessionData(res.data.sessionData);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getSessionInfo();
  }, []);
  const handleMessage = () => {
    message.info("you have unfinished session");
  };
  /**
   * start a new assessment in specific session
   * @param {number} sessionId
   */
  const goAssessment = (sessionId) => {
    console.log(sessionId);
    nav("/assessment/" + patientId + "/" + sessionId);
  };

  const [chartData, setCharData] = useState(null);
  /**
   * callback of select a session
   * @param {number} sessionId
   * @param {boolean} end end flag
   */
  const chooseSession = (sessionId, end) => {
    console.log(sessionId);
    if (end) {
      setCharData(sessionState.sessionList[patientId][sessionId - 1].data);
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
    let unfinished = sessionData.find((item) => item.end === false);
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
