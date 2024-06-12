import {
  registerApi,
  loginApi,
  getInfo,
  updateInfo,
  forgetPassword,
} from "./user";
import {
  newSession,
  getSessionByPatientAndTherapist,
  getSessionInfo,
  newAssessment,
  endSession,
} from "./session";
import { addNewPatient, getPatientInfo, getPatientList,updatePatientProfile } from "./patient";
import { researcherLogin, getResearchData } from "./researcher";

export {
  registerApi,
  loginApi,
  getInfo,
  updateInfo,
  forgetPassword,
  newSession,
  getSessionByPatientAndTherapist,
  getSessionInfo,
  newAssessment,
  endSession,
  addNewPatient,
  getPatientInfo,
  getPatientList,
  researcherLogin,
  getResearchData,
  updatePatientProfile
};
