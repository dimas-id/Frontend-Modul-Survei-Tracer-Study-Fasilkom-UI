import React from "react";
import StepContext from "../../pages/RegistrationRouter/StepContext";

export const withStepConsumer = Component => {
  return props => (
    <StepContext.Consumer>
      {contextProps => <Component {...props} {...contextProps} />}
    </StepContext.Consumer>
  );
};
