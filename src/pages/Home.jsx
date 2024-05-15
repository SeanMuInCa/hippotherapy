import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import useUserStore from "@/store/userStore";
import Navgator from "../components/Navgator";
function Home() {
  const [{ isLogin }] = useUserStore();
  console.log(isLogin);
  const nav = useNavigate();
  const handleClick = () => {
    nav("/login");
  };
  const goAssessment = () => {
    nav("/assessment");
  };
  const goPatients = () => {
    nav("/patient");
  };

  return (
    <>
    <Navgator></Navgator>
      <div className="my-20">
        <h1 className="text-center">Home Page</h1>
        <div className="flex justify-center mt-10">
          <Button type="primary" onClick={handleClick}>
            Back to Login
          </Button>
          <Button type="primary" onClick={goAssessment}>
            goAssessment
          </Button>
          <Button type="primary" onClick={goPatients}>
            goPatients
          </Button>
        </div>
      </div>
    </>
  );
}

export default Home;
