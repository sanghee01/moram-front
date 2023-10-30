import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./Fonts/Font.css";
import { RecoilRoot } from "recoil";
import axios from "axios";

axios.defaults.withCredentials = true;

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <RecoilRoot>
    <App />
  </RecoilRoot>
);
