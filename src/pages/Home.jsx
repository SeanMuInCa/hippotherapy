import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import PicCard from "../components/PicCard";
import useUserStore from "@/store/userStore";
import Card from "../components/Card";
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
  return (
    <>
    <Card></Card>
      <PicCard></PicCard>
      <div className="my-20">
        <h1 className="text-center">Home Page</h1>
        <div className="flex justify-center mt-10">
          <Button type="primary" onClick={handleClick}>
            Back to Login
          </Button>
          <Button type="primary" onClick={goAssessment}>
            goAssessment
          </Button>
        </div>
      </div>
    </>
  );
}

export default Home;
