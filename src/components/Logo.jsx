import logo from '@/assets/logo.png';
export default function Logo(props) {
  let style = "";
  if (props.size === "large") {
    style = "w-30 h-30 mt-10";
  } else {
    style = "w-10 h-10 mt-1";
  }
  return (
    <div className={style}>
      <img src={logo} alt="" className="w-full h-full" />
    </div>
  );
}
