import React from "react";
import { withRouter } from "react-router";
import get from "lodash/get";

import paths from "../paths";

import RouterWrapper from "../../components/RouterWrapper";
import StepProgress from "../../components/StepProgress";
import RegistrationPage from "./RegistrationPage";
import EducationPage from "./EducationPage";

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
    title: "Pendidikan",
    route: {
      exact: true,
      path: paths.EDUCATION,
      component: EducationPage
    }
  },
  {
    title: "Pekerjaan",
    route: {
      exact: true,
      path: paths.WORK_POSITION,
      component: () => "pekerjaan"
    }
  },
  {
    title: "Preferensi",
    route: {
      exact: true,
      path: paths.PREFERENCE,
      component: () => "preferensi"
    }
  }
];

function getRoutePath(step) {
  return `${paths.REGISTER}${get(ROUTES[step], "route.path")}`;
}

function getInitialStep(currentPath) {
  return (
    ROUTES.findIndex(
      el =>
        el.route.path !== paths.LANDING && currentPath.includes(el.route.path)
    ) - 1
  );
}

const MAX_STEP = 3;

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

  function handleBack(e) {
    setCurrentStep(prevStep => prevStep - 1);
  }

  function handleNext(e) {
    setCurrentStep(prevStep => prevStep + 1);
  }

  return (
    <React.Fragment>
      <RouterWrapper paths={ROUTES} />
      <StepProgress
        steps={MAX_STEP}
        activeStep={currentStep}
        onBack={handleBack}
        onNext={handleNext}
        position="bottom"
      />
    </React.Fragment>
  );
});
