// routes.js
import { Navigate } from "react-router-dom";
import Login from "@/pages/Login.jsx";
import Home from "@/pages/Home.jsx";
import PicCard from "../components/PicCard.jsx";
import Patient from "@/pages/Patient.jsx";
import PatientDetail from "@/pages/PatientDetail.jsx";
import Register from "@/pages/Register.jsx";
import Assessment from "../components/Assessment.jsx";
import ResearcherLogin from "../pages/ResearcherLogin.jsx";
// 定义路由数组
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
    path: "/home",
    element: <Navigate to="/patient" />,
  },
  {
    path: "/pics",
    element: <PicCard />,
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
    path: "/assessment",
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
];

export default globalRouters;
