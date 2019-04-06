import React from "react";
import { withRouter } from "react-router";
import get from "lodash/get";

import paths from "../paths";

import RouterWrapper from "../../components/RouterWrapper";
import StepProgress from "../../components/StepProgress";
import RegistrationPage from "./RegistrationPage";
import WorkPositionPage from "./WorkPositionPage";

const ROUTES = [
  {
    title: "Registrasi",
    route: {
      exact: true,
      path: paths.LANDING,
      component: RegistrationPage
    }
  },
  {
    title: "Pekerjaan",
    route: {
      path: paths.WORK_POSITION,
      component: WorkPositionPage
    }
  },
  {
    title: "Preferensi",
    route: {
      path: paths.PREFERENCE,
      component: () => "preferensi"
    }
  }
];

const MAX_STEP = ROUTES.length ;

function getRoutePath(step) {
  const subpath = get(ROUTES[step-1], "route.path") || "";
  return `${paths.REGISTER}${subpath}`;
}

function getInitialStep(currentPath) {
  return ROUTES.findIndex(
    el => el.route.path !== paths.LANDING && currentPath.includes(el.route.path)
  );
}

export default withRouter(function RegistrationRouter({ history, location }) {
  const [currentStep, setCurrentStep] = React.useState(
    getInitialStep(location.pathname)
  );

  React.useEffect(() => {
    const targetPath = getRoutePath(currentStep + 1);
    if (currentStep === MAX_STEP) {
      // finally, redirect to user dashboard
      history.push(paths.HOME);
    } else if (targetPath !== location.pathname) {
      // target path after next/back
      history.push(targetPath);
    }
  }, [currentStep]);

  function handleBack() {
    setCurrentStep(prevStep => prevStep - 1);
  }

  function handleNext() {
    setCurrentStep(prevStep => prevStep + 1);
  }

  return (
    <React.Fragment>
      <RouterWrapper paths={ROUTES} />
      {currentStep > 0 && (
        <StepProgress
          start={1}
          steps={MAX_STEP}
          activeStep={currentStep}
          onBack={handleBack}
          onNext={handleNext}
          position="bottom"
        />
      )}
    </React.Fragment>
  );
});
