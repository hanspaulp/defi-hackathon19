import React from "react";
import { render } from "react-dom";
import App from "./Components/App";
import Web3Provider from "react-web3-provider";
import ErrorBoundary from "./Components/errorBoundary.js";
import Web3 from "web3";

window.web3 = new Web3(
  new Web3.providers.HttpProvider(
    "https://kovan.infura.io/v3/a5df6a93ae4f460e972e04fa5398d157"
  )
);

render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>,
  document.getElementById("root")
);
