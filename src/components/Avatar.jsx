import avatar from "../utils/getAvatar";
const img = avatar();
const Avatar = () => {
  return <img src={img} alt="" className="w-20" />;
};

export default Avatar;
