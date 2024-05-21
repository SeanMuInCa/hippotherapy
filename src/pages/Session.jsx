import { Button } from "antd";
import { useParams } from "react-router-dom";
const Session = () => {
  const {id} = useParams();
  const goAssessment = () => {
    window.location.href = "/assessment/" + id;
  };
  return (
    <>
      <div>Session</div>
      <Button type="primary" onClick={goAssessment}>new assessment</Button>
    </>
  );
};

export default Session;
