import { Input, Button } from "@douyinfe/semi-ui";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const nav = useNavigate();
  const handleClick = () => {
    nav("/home");
  };
  return (
    <div className="flex flex-col items-center">
      <img src="../../public/cat.jpg" alt="" style={{ width: 500 }} />
      <div className="mt-5 w-96">
        <Input placeholder="account" size="large" />
      </div>
      <div className="mt-5 w-96">
        <Input placeholder="password" size="large" mode="password" />
      </div>
      <div className="mt-10 w-96">
        <Button type="primary" block={true} onClick={handleClick}>
          Login
        </Button>
      </div>
    </div>
  );
}
