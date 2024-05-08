import { Button } from "antd";
import "../index.css";
import Logo from "@/components/Logo";
import { useNavigate } from "react-router-dom";
import useUserStore from "@/store/userStore";
export default function Tobbar() {
  const [state, actions] = useUserStore.useStore();
  const nav = useNavigate();
  const handleClick = () => {
    nav("/login");
    actions.setLoginStatus(false);
  };
  return (
    <div className="flex justify-between items-center">
      <div className="font-bold text-lg flex mx-5">
        <Logo></Logo>
        <span className="m-2">Welcome to use XXX</span>
      </div>
      <div>
        {state.isLogin ? (
          <Button
            onClick={handleClick}
            className="mx-5"
            shape="circle"
            size="large"
          >
            MZH
          </Button>
        ) : (
          <Button
            onClick={handleClick}
            className="mx-5"
            shape="circle"
            size="large"
          >
            no
          </Button>
        )}
      </div>
    </div>
  );
}
