import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import useUserStore from "@/store/userStore";
import CardTemp from "../components/CardTemp";
function Home() {
	const [{ isLogin }] = useUserStore();
	console.log(isLogin);
	const nav = useNavigate();
	const handleClick = () => {
		nav("/login");
	};
	const goAssessment = () => {
		nav("/assessment");
	};
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
			<div className="flex mx-5 flex-wrap">
				{data.map((item, i) => (
					<CardTemp key={i} data={item}></CardTemp>
				))}
			</div>
			<div className="my-20">
				<h1 className="text-center">Home Page</h1>
				<div className="flex justify-center mt-10">
					<Button type="primary" onClick={handleClick}>
						Back to Login
					</Button>
					<Button type="primary" onClick={goAssessment}>
						goAssessment
					</Button>
				</div>
			</div>
		</>
	);
}

export default Home;
