import { Button, Result } from "antd";
import useSessionStore from "../store/useSession";

const AssessmentResult = (props) => {
  const [state, action] = useSessionStore.useStore();
  const handleEnd = () => {
    action.endSession(props.id);
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
