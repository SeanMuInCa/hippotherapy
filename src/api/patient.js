import request from "@/utils/request.js";

const API = {
  ADD: "/newPatient",
  INFO: "/patient-info/",
};
export const addNewPatient = (patientInfo) =>
  request.post(API.ADD, patientInfo);
export const getPatientInfo = (patientId, therapistId) =>
  request.get(API.INFO + `${patientId}/${therapistId}`);
