import avatar from "../utils/getAvatar";
import { Button } from "antd";
const Avatar = ({ img,edit,setImg }) => {
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
