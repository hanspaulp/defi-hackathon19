import React, { Component, Fragment } from "react";
import { Header, Footer } from "./Layout/";
import { muscles } from "../store.js";

class App extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <Footer muscles={muscles} />
      </Fragment>
    );
  }
}
export default App;
