import TherapyForm from "./TherapyForm";
import useUserStore from "../store/userStore";

const Profile = () => {
  const [state, actions] = useUserStore.useStore();
  return (
    <TherapyForm data={state.data} type='edit'/>
  );
};

export default Profile;
