import { Button } from "antd";
import "../index.css";
import Logo from "@/components/Logo";
import { useNavigate } from "react-router-dom";
import useUserStore from "@/store/userStore";
import { useEffect, useState } from "react";
/**
 * this is the top bar contains logo and therapy's logout button
 * @returns
 */
export default function Tobbar() {
  const [state, actions] = useUserStore.useStore();
  const nav = useNavigate();
  const handleClick = () => {
    nav("/login");
    actions.setLoginStatus(false);
    localStorage.removeItem("isLogin");
    localStorage.removeItem("role");
    localStorage.removeItem("therapistId");
    localStorage.removeItem("last_name");

    localStorage.removeItem("list");
    localStorage.removeItem("therapist");
    sessionStorage.removeItem("hasRefreshed");
    sessionStorage.removeItem("Refreshed");
  };
  const goReg = () => {
    nav("/register");
  };
  const [roleData, setRoleData] = useState();
  useEffect(() => {
    const a = localStorage.getItem("last_name") || "";
    a && setRoleData({ last_name: a });
  }, [localStorage.getItem("last_name")]);

  return (
    <>
      <div className="flex justify-between items-center bg-gray-100">
        <div className="font-bold flex mx-5">
          <Logo></Logo>
          <span className="m-2 text-sm md:text-lg lg:text-xl xl:text-2xl leading-8">
            SPCM in Hippotherapy
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
              {roleData
                ? roleData.last_name.substring(0, 3)
                : state.data.last_name}
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
    </>
  );
}
