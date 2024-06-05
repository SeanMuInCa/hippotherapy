import request from "@/utils/request.js";

const API = {
  ADD: "/newSession",
  GET_SESSION_LIST_BY_PATIENT_AND_THERAPIST: "/patient-info/",
  GET_SESSION_DETAIL: "/patientProfile/patient/",
};

export const newSession = async (data) => request.post(API.ADD, data);
export const getSessionByPatientAndTherapist = async (patientId, therapistId) =>
  request.get(
    API.GET_SESSION_LIST_BY_PATIENT_AND_THERAPIST +
      `${patientId}/${therapistId}`,
  );

export const getSessionInfo = (sessionId) =>
  request.get(API.GET_SESSION_DETAIL + sessionId);
