import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import PicCard from "../components/PicCard";
import Assessment from "../components/Assessment";
function Home() {
  const nav = useNavigate();
  const handleClick = () => {
    nav("/login");
  };
  return (
    <>
      <PicCard></PicCard>
      <div className="my-20">
        <h1 className="text-center">Home Page</h1>
        <div className="flex justify-center mt-10">
          <Button type="primary" onClick={handleClick}>
            Back to Login
          </Button>
        </div>
      </div>
      <Assessment></Assessment>
    </>
  );
}

export default Home;
