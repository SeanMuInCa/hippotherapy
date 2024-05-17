import ReactDOM from "react-dom/client";

import App from "./App.jsx";
import "./index.css";
//设置移动端适配  这里除几，就是多少REM，这里是750rem就是总宽度
// document.documentElement.style.fontSize = 100 / 750 + 'vh';
console.log(document.documentElement.style.fontSize);
ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <App />
  </>,
);
