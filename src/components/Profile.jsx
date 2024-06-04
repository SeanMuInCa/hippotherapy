import TherapyForm from "./TherapyForm";
import useUserStore from "../store/userStore";
import { useEffect, useState } from "react";
/**
 * this is the profile of therapy component, it contains a sub-component of form
 * @returns
 */
const Profile = () => {
  const [state, actions] = useUserStore.useStore();
  const [therapistData, setTherapistData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTherapistData(JSON.parse(localStorage.getItem("therapist")));
    setIsLoading(false);
  }, []);
  console.log("editprofile", therapistData);
  if (isLoading) {
    return <div>Loading...</div>; // 显示加载指示器或空内容
  }

  return <TherapyForm data={therapistData} type="edit" />;
};

export default Profile;
