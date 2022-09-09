import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { ReactFlowProvider } from "react-flow-renderer";
import { RecoilRoot } from "recoil";
import { ChakraProvider } from "@chakra-ui/react";

import App from "./App";
import { AuthProvider } from "./components/auth-container";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <ChakraProvider>
        <ReactFlowProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </ReactFlowProvider>
      </ChakraProvider>
    </RecoilRoot>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
