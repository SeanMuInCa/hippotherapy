import { Button, Result,message } from "antd";
import useSessionStore from "../store/useSession";
import { useParams, useNavigate } from "react-router-dom";
import {endSession} from '@/api/session.js';
/**
 * this component is the end page of finish an assessment
 * in this page the user can choose either to end the session or start a new assessment in this session
 * @returns a page with two buttons
 */
const AssessmentResult = () => {
  const [state, action] = useSessionStore.useStore();
  const { patientId, sessionId } = useParams();
  const navigate = useNavigate();
  /**
   * callback of end session button
   */
  const handleEnd = async() => {
    const endObj = {
      session_id: parseInt(sessionId)
    };
    const res = await endSession(endObj);
    if(res.data.success){
      message.success(res.data.message);
    }
    // navigate(`/session/${patientId}`);
  };
  /**
   * callback of new assessment button
   */
  const goAssessment = () => {
    console.log(sessionId);
    navigate("/assessment/" + patientId + "/" + sessionId);
  };
  return (
    <Result
      status="success"
      title="Successfully Submit a New Assessment"
      extra={[
        <Button type="primary" key="console" onClick={handleEnd}>
          End Session
        </Button>,
        <Button key="buy" onClick={goAssessment}>
          New Assessment
        </Button>,
      ]}
    />
  );
};
export default AssessmentResult;
