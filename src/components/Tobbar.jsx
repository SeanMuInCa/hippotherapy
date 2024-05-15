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
    localStorage.removeItem("isLogin");
  };
  const goReg = () => {
    nav("/register");
  };
  return (
    <>
      <div className="flex justify-between items-center bg-gray-100">
        <div className="font-bold flex mx-5">
          <Logo></Logo>
          <span className="m-2 text-sm md:text-lg lg:text-xl xl:text-2xl leading-8">
            Hippotherapy
          </span>
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
            <>
              <span
                className="cursor-pointer text-orange-700 text-sm md:text-lg lg:text-xl xl:text-2xl"
                onClick={goReg}
              >
                Sign Up
              </span>
              <Button
                onClick={handleClick}
                className="mx-1"
                shape="circle"
                size="large"
              >
                no
              </Button>
            </>
          )}
        </div>
      </div>
      <div className="bg-gray-100">
        <ul className="flex">
          <li>1</li>
          <li>1</li>
          <li>1</li>
        </ul>
      </div>
    </>
  );
}
