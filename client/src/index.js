import React from "react";
import ReactDom from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "./context/context";
import { SpeechProvider } from "@speechly/react-client";
import "bootstrap/dist/css/bootstrap.min.css";

//Here, we wrapped our whole application in the context provider

//Speechly has its own Provider too !
ReactDom.render(
  <SpeechProvider appId="a770ce0a-f365-4f60-9d76-0af816d82c0c" language="en-US">
    <Provider>
      <App />
    </Provider>
  </SpeechProvider>,
  document.getElementById("root")
);
