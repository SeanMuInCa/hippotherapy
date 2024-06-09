import { Button } from "antd";
import { getResearchData } from "@/api";
import {Loading} from "../components";
import { useState } from "react";
/**
 * researcher landing page
 * @returns
 */
const ResearcherPage = () => {
  const [load, setLoad] = useState(true);
	const handleDownload = async () => {
    setLoad(false);
		const res = await getResearchData();
		if (res.status == 200) {
			const url = window.URL.createObjectURL(new Blob([res.data]));
			const link = document.createElement("a");
			link.href = url;
			link.setAttribute("download", "SPCM Patients Data.csv"); 
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
      setLoad(true);
		}
	};
	return (
		<div className="flex justify-center flex-col items-center ">
			<h1 className="text-3xl mb-5">Researcher Page</h1>
			<Button type="primary" onClick={handleDownload}>
				Download
			</Button>
      {!load && <Loading />}
		</div>
	);
};

export default ResearcherPage;
