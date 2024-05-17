import { Tabs } from "antd";
import Patient from "../pages/Patient";
import { useNavigate } from "react-router-dom";

const Navgator = () => {
  const nav = useNavigate();
  const onChange = (key) => {
    console.log(key);
    nav("/home");
  };
  const handleTabClick = (key, e) => {
    console.log(key);
    console.log(e);
    if (key == 2) nav("/patient");
  };
  const items = [
    {
      key: "1",
      label: "Profile",
      children: 1,
    },
    {
      key: "2",
      label: "Patient List",
      children: 2,
    },
    {
      key: "3",
      label: "New Patient",
      children: "Content of Tab Pane 3",
    },
  ];
  return (
    <div className="px-5">
      <Tabs
        defaultActiveKey="2"
        items={items}
        onChange={onChange}
        onTabClick={handleTabClick}
      />
    </div>
    // <div className="px-5 bg-gray-100 pt-5 pb-1 flex flex-wrap ">
    // 	<ul className="flex leading-9">
    // 		<li className="mr-5">
    // 			<Link>Profile</Link>
    // 		</li>
    // 		<li className="mr-5">
    // 			<Link>Patient List</Link>
    // 		</li>
    // 		<li className="mr-5">
    // 			<Link>New Patient</Link>
    // 		</li>
    // 	</ul>
    // 	<div>
    // 		<Search
    // 			placeholder="input patient id"

    // 			//   onSearch={onSearch}
    // 			style={{
    // 				width: 200,
    // 			}}
    // 		/>
    // 	</div>
    // </div>
  );
};

export default Navgator;
