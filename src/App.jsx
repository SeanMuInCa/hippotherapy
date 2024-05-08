import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Tobbar from "./components/Tobbar";
import globalRouters from "./router/routes.jsx";

function App() {
  return (
    <Router>
      <Tobbar />
      <Routes>
        {globalRouters.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
    </Router>
  );
}

export default App;
