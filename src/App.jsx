import "./index.css";
import Tobbar from "./components/Tobbar";
import { RouterProvider } from "react-router-dom";
import { globalRouters } from "@/router/routes.jsx";
// import Login from "@/pages/Login.jsx";

function App() {
  return (
    <>
      <Tobbar></Tobbar>
      <RouterProvider router={globalRouters} />
    </>
  );
}

export default App;
