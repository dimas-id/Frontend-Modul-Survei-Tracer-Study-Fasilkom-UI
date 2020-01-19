import React from "react";

const StepContext = React.createContext({
  steps: 0,
  activeStep: 0,
  handleBack: () => {},
  handleNext: () => {},
});
export default StepContext;
