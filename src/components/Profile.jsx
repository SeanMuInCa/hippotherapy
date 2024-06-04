import TherapyForm from "./TherapyForm";
import useUserStore from "../store/userStore";
/**
 * this is the profile of therapy component, it contains a sub-component of form
 * @returns
 */
const Profile = () => {
  const [state, actions] = useUserStore.useStore();
  console.log('editprofile',state);
  return <TherapyForm data={state.data} type="edit" />;
};

export default Profile;
