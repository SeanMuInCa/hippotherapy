import { Card } from "antd";
export default function CardTemp() {
	const data = [
		{
			id: 0,
			fName: "aaa0",
			lName: "bbb",
			email: "abc@abc.com",
			language: "english",
			number: "1231234567",
			gender: "male",
			location: "sk",
			history: "history",
			diagnosis: "diagnosis",
		},
		{
			id: 1,
			fName: "aaa1",
			lName: "bbb",
			email: "abc@abc.com",
			language: "english",
			number: "1231234567",
			gender: "male",
			location: "sk",
			history: "history",
			diagnosis: "diagnosis",
		},
		{
			id: 2,
			fName: "aaa2",
			lName: "bbb",
			email: "abc@abc.com",
			language: "english",
			number: "1231234567",
			gender: "male",
			location: "sk",
			history: "history",
			diagnosis: "diagnosis",
		},
		{
			id: 3,
			fName: "aaa3",
			lName: "bbb",
			email: "abc@abc.com",
			language: "english",
			number: "1231234567",
			gender: "male",
			location: "sk",
			history: "history",
			diagnosis: "diagnosis",
		},
	];
	return (
		<>
			<Card title="Small size card" style={{ width: 300 }}>
				<div className="flex justify-evenly">
					<div className="bg-red-500 flex-2 rounded-xl w-20 h-20 text-center leading-normal text-5xl font-bold">
            {data[0].fName.charAt(0)} {data[0].lName.charAt(0)}
          </div>
					<div className=" flex-1">
            <p></p>
          </div>
				</div>
			</Card>
		</>
	);
}
