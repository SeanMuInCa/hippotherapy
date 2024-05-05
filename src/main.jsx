import ReactDOM from "react-dom/client";
import { RouterProvider } from 'react-router-dom';
import { globalRouters } from '@/router/routes.jsx';
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
<>
<App />
<RouterProvider router={globalRouters} />
</>
);
