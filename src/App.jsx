import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Tobbar from "./components/Tobbar";
import globalRouters from "./router/routes.jsx";
import useUserStore from "./store/userStore.js";
import Navgator from "./components/Navgator.jsx";
function App() {
  const userStore = useUserStore();
  console.log(userStore[0].isLogin);
  return (
    <Router>
      <Tobbar />
      {userStore[0].isLogin ? <Navgator /> : ""}
      <Routes>
        {globalRouters.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
    </Router>
  );
}

export default App;
