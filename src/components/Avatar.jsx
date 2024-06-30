import avatar from "../utils/getAvatar";
import { Button } from "antd";
/**
 * this component is to generate a avatar for the patient
 * @param {img} -the url of the avatar
 * @param {edit} -the status of the avatar true or false
 * @param {setImg} -the function to change the url of the avatar
 * @returns
 */
const Avatar = ({ img, edit, setImg }) => {
  /**
   * callback of change avatar button
   */
  const newAvatar = () => {
    const newImg = avatar();
    setImg(newImg);
  };
  return (
    <>
      <img src={img} alt="" className="w-20" />
      {edit && (
        <Button size="small" onClick={newAvatar}>
          Change one
        </Button>
      )}
    </>
  );
};
export default Avatar;
