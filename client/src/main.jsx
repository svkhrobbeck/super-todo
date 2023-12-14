import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.scss";
import "./service/axios";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <App />
    <ToastContainer />
  </>
);
