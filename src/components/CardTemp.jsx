import { Card } from "antd";
export default function CardTemp(props) {
  console.log(props);
  const data = props.data;
  return (
    <>
      <Card title="Patient" style={{ width: 300, margin: 10 }}>
        <div className="flex justify-evenly">
          <div className="bg-red-500 flex-2 rounded-xl w-20 h-20 text-center leading-normal text-5xl font-bold px-1">
            {data.fName.charAt(0)} {data.lName.charAt(0)}
          </div>
          <div className=" flex-1 px-5 py-2">
            <p>{data.email}</p>
            <p>{data.language}</p>
            <p>{data.location}</p>
          </div>
        </div>
      </Card>
    </>
  );
}
