import React from "react";
import LoadingScreen from "../LoadingFill";

const loadingScreen = props => (
  <div style={{ height: "100vh", width: "100vw" }}>
    <LoadingScreen {...props} customText = {"Loading Page ..."}/>
  </div>
);

export default loadingScreen;
