import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Auth from "./api/Auth.jsx";
import File from "./api/File.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth>
      <File>
        <App />
      </File>
    </Auth>
  </React.StrictMode>
);
