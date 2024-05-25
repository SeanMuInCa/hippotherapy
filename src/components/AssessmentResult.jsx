import { Button, Result } from "antd";
import useSessionStore from "../store/useSession";
import { useParams,useNavigate } from "react-router-dom";
const AssessmentResult = () => {
  const [state, action] = useSessionStore.useStore();
  const {patientId, sessionId} = useParams();
  const navigate = useNavigate();
  const handleEnd = () => {
    action.endSession(patientId,sessionId);
    navigate(`/session/${patientId}`);
  };
  return (
    <Result
      status="success"
      title="Successfully Submit a New Assessment"
      extra={[
        <Button type="primary" key="console" onClick={handleEnd}>
          End Session
        </Button>,
        <Button key="buy">New Assessment</Button>,
      ]}
    />
  );
};
export default AssessmentResult;
