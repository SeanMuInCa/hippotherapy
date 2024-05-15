import { useParams } from "react-router-dom";
import usePatientStore from "../store/usePatient";
import { Button } from "antd";
import { useEffect } from "react";
export default function PatientDetail({id}) {
	const patientStore = usePatientStore();
    const data = patientStore[0].data[id];
    useEffect(()=>{
        console.log(id);
    },[id]);
	if(data)
        return (
            <>
                <div className="bg-gray-500 w-full p-20 flex">
                    <div className="w-32 h-32 bg-red-500 mx-20 text-6xl flex justify-around items-center">
                        <div>{data.fName.toUpperCase().charAt(0)}</div>
                        <div>{data.lName.toUpperCase().charAt(0)}</div>
                    </div>
                    <div className="bg-green-300 flex-1">
                        {Object.keys(data).map((key, index) => (
                            <p className="p-2" key={index}>
                                {key}: {data[key]}
                            </p>
                        ))}
                        <Button type="primary" className="mt-5">
                            Edit Profile
                        </Button>
                    </div>
                </div>
            </>
        );
}
