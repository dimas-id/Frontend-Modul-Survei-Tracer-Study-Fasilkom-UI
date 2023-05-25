import React from "react";
import LoadingScreen from "../LoadingFill";

const loadingScreen = ({props, customText}) => (
        <div style={{ height: "100vh", width: "100vw" }}>
            <LoadingScreen {...props} customText = {customText} />
        </div>
);

export default loadingScreen;
