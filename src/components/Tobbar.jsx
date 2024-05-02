import React, { useState } from "react";
import { Button } from "@douyinfe/semi-ui";
import "../index.css";
import Logo from '@/components/Logo';
export default function Tobbar() {
	const [flag, setFlag] = useState(false);
	const handleClick = () => {
		const body = document.body;
		if (body.hasAttribute("theme-mode")) {
			body.removeAttribute("theme-mode");
			setFlag(false);
		} else {
			body.setAttribute("theme-mode", "dark");
			setFlag(true);
		}
	};
	return (
		<div className="flex justify-between items-center">
			<div className="font-bold text-lg flex">
            <Logo></Logo>
                <span className="m-2">Welcome to use XXX</span>
            </div>
			<div>
				<Button onClick={handleClick}>{flag ? "Light Mode" : "Dark Mode"}</Button>
			</div>
		</div>
	);
}
