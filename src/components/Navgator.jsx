import { Tabs } from "antd";
import { useNavigate } from "react-router-dom";
import useUserStore from "../store/userStore";
import { useEffect, useState } from "react";
const Navgator = () => {
  const [state, actions] = useUserStore.useStore();

  const nav = useNavigate();
  // const onChange = (key) => {
  //   console.log(key);
  //   nav("/home");
  // };
  useEffect(() => {
    const hasRefreshed = sessionStorage.getItem("hasRefreshed");
    if (!hasRefreshed) {
      sessionStorage.setItem("hasRefreshed", "true");
      nav(0); // 刷新当前页面，或者使用 window.location.reload();
    }
  }, [nav]);

  const handleReset = () => {
    sessionStorage.removeItem("hasRefreshed");
    // 其他重置逻辑...
  };
  const handleTabClick = (key) => {
    console.log("key==", key);
    if (key == 1) nav("/patient");
    if (key == 2) nav("/profile");
    if (key == 3) nav("/newPatient");
  };
  console.log("state==", state);
  const items = [
    {
      key: "1",
      label: "Patient List",
      // children: 1,
    },
    {
      key: "2",
      label: "Profile",
      // children: 2,
    },
    {
      key: "3",
      label: "New Patient",
      // children: "Content of Tab Pane 3",
    },
  ];
  const researcherItem = [
    {
      key: "1",
      label: "Researcher",
      // children: 1,
    },
  ];
  return (
    <div className="px-5">
      <Tabs
        defaultActiveKey="1"
        items={state.role ? researcherItem : items}
        // onChange={onChange}
        onTabClick={handleTabClick}
      />
      {handleReset}
    </div>
  );
};

export default Navgator;
