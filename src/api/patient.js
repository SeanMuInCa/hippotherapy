import request from "@/utils/request.js";

const API = {
  ADD: "/newPatient",
  INFO: "/patient-info/",
  GET_PATIENT_LIST: "/patientList/",
};

export const addNewPatient = (patientInfo) =>
  request.post(API.ADD, patientInfo);
export const getPatientInfo = (patientId, therapistId) =>
  request.get(API.INFO + `${patientId}/${therapistId}`);

export const getPatientList = (therapistId) =>
  request.get(API.GET_PATIENT_LIST + therapistId);
