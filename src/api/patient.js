import request from "@/utils/request.js";

const API = {
  ADD: "/newPatient",
};
export const addNewPatient = (patientInfo) =>
  request.post(API.ADD, patientInfo);
