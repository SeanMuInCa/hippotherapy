// routes.js
import { Navigate } from "react-router-dom";
import Login from "@/pages/Login.jsx";
import Patient from "@/pages/Patient.jsx";
import PatientDetail from "@/pages/PatientDetail.jsx";
import Register from "@/pages/Register.jsx";
import ResearcherLogin from "../pages/ResearcherLogin.jsx";
import ResearcherHome from "../pages/ResearcherPage.jsx";
import Session from "@/pages/Session.jsx";
import {
  Assessment,
  Profile,
  NewPatient,
  AssessmentResult,
  ResetResult,
} from "@/components";
// routers array
const globalRouters = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/researcherlogin",
    element: <ResearcherLogin />,
  },
  {
    path: "/researcherhome",
    element: <ResearcherHome />,
  },
  {
    path: "/home",
    element: <Navigate to="/patient" />,
  },
  {
    path: "/",
    element: <Navigate to="/login" />,
  },
  {
    path: "*",
    element: <Navigate to="/login" />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/session/:id",
    element: <Session />,
  },
  {
    path: "/assessment/:patientId/:id",
    element: <Assessment />,
  },
  {
    path: "/patient",
    element: <Patient />,
  },
  {
    path: "/patient/:id",
    element: <PatientDetail />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/newpatient",
    element: <NewPatient />,
  },
  {
    path: "/assessmentresult/:patientId/:sessionId",
    element: <AssessmentResult />,
  },
  {
    path: "/resetresult/:pwd",
    element: <ResetResult />,
  },
];

export default globalRouters;
