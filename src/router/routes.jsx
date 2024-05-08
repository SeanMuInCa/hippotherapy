// routes.js
import { Route, Navigate } from "react-router-dom";
import Login from "@/pages/Login.jsx";
import Home from "@/pages/Home.jsx";
import PicCard from "../components/PicCard.jsx";
import Register from "@/pages/Register.jsx";
import Assessment from "../components/Assessment.jsx";

// 定义路由数组
const globalRouters = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/home",
    element: <Home />,
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
];

export default globalRouters;
