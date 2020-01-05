import React from "react";
import { withRouter } from "react-router";
import get from "lodash/get";

import paths from "../paths";

import Particle from "../../components/Particle";
import RouterWrapper from "../../components/RouterWrapper";
import StepProgress from "../../components/StepProgress";
import RegistrationPage from "./RegistrationPage";
import EducationPage from "./EducationPage";
import WorkPositionPage from "./WorkPositionPage";
import PreferencePage from "./PreferencePage";

const ROUTES = [
  {
    title: "Registrasi",
    route: {
      exact: true,
      path: paths.LANDING,
      component: RegistrationPage,
    },
  },
  {
    title: "Edukasi",
    route: {
      path: paths.EDUCATION,
      component: EducationPage,
    },
  },
  {
    title: "Pekerjaan",
    route: {
      path: paths.WORK_POSITION,
      component: WorkPositionPage,
    },
  },
  {
    title: "Preferensi",
    route: {
      path: paths.PREFERENCE,
      component: PreferencePage,
    },
  },
];

const MAX_STEP = ROUTES.length;

function getRoutePath(step) {
  const subpath = get(ROUTES[step - 1], "route.path") || "";
  return `${paths.REGISTER}${subpath}`;
}

function getInitialStep(currentPath) {
  return ROUTES.findIndex(
    el => el.route.path !== paths.LANDING && currentPath.includes(el.route.path)
  );
}

export default withRouter(function RegistrationRouter({ history, location }) {
  const tempStep = getInitialStep(location.pathname);
  const [currentStep, setCurrentStep] = React.useState(
    tempStep === -1 ? 1 : tempStep
  );
  const [loading, setLoading] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);

  React.useEffect(() => {
    const targetPath = getRoutePath(currentStep + 1);
    if (currentStep === MAX_STEP) {
      // finally, redirect to user dashboard
      history.push(paths.HOME);
    } else if (
      (location.pathname.includes(paths.EDUCATION) ||
        location.pathname.includes(paths.WORK_POSITION) ||
        location.pathname.includes(paths.PREFERENCE)) &&
      targetPath !== location.pathname
    ) {
      // target path after next/back
      history.push(targetPath);
    }
  }, [currentStep]);

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function submitEducation(values) {
    setLoading(true);
    await sleep(5000);
    setLoading(false);
  }

  function handleBack() {
    setCurrentStep(prevStep => prevStep - 1);
  }

  function handleNext() {
    if (location.pathname.includes(paths.EDUCATION)) {
      submitEducation().then(e => {
        setCurrentStep(prevStep => prevStep + 1);
      });
    } else {
      setCurrentStep(prevStep => prevStep + 1);
    }
  }

  return (
    <React.Fragment>
      <Particle name="cloud2" top={120} left={0} />
      <RouterWrapper paths={ROUTES} />
      {currentStep > 0 &&
        (location.pathname.includes(paths.EDUCATION) ||
          location.pathname.includes(paths.WORK_POSITION) ||
          location.pathname.includes(paths.PREFERENCE)) && (
          <StepProgress
            isLoading={loading}
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
