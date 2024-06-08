import { Tabs } from "antd";
import { useNavigate } from "react-router-dom";
import useUserStore from "../store/userStore";
import { useEffect } from "react";

/**
 * this component is the navigator, it contains three tabs, patient list, new patient, my profile
 * @returns
 */
const Navgator = () => {
  // eslint-disable-next-line no-unused-vars
  const [state, actions] = useUserStore.useStore();
  const nav = useNavigate();
  useEffect(() => {
    const hasRefreshed = sessionStorage.getItem("hasRefreshed");
    if (!hasRefreshed) {
      sessionStorage.setItem("hasRefreshed", "true");
      nav(0); // refresh
    }
  }, [nav]);

  const handleReset = () => {
    sessionStorage.removeItem("hasRefreshed");
    //
  };
  /**
   * callback of user's click tab
   * @param {int} key label key
   */
  const handleTabClick = (key) => {
    if (key == 1) nav("/patient");
    if (key == 2) nav("/newPatient");
    if (key == 3) nav("/profile");
  };
  console.log("state==", state);
  /**
   * navigator label data for therapist landing page
   */
  const items = [
    {
      key: "1",
      label: "Patient List",
    },
    {
      key: "2",
      label: "New Patient",
    },
    {
      key: "4",
    },
    {
      key: "5",
    },
    {
      key: "6",
    },
    {
      key: "7",
    },
    {
      key: "3",
      label: "My Profile",
    },
  ];
  /**
   * navigator label data for researcher landing page
   */
  const researcherItem = [
    {
      key: "1",
      label: "Researcher",
    },
  ];
  return (
    <div className="px-2">
      <Tabs
        defaultActiveKey="1"
        items={state.role ? researcherItem : items}
        onTabClick={handleTabClick}
      />
      {handleReset}
    </div>
  );
};

export default Navgator;
