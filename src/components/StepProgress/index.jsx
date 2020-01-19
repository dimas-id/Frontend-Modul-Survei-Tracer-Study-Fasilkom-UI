import React from "react";

import { makeStyles } from "@material-ui/styles";
import MobileStepper from "@material-ui/core/MobileStepper";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import CircularProgress from "@material-ui/core/CircularProgress";
import Fade from "@material-ui/core/Fade";

const styles = {
  root: {
    width: "100%",
    flexGrow: 1,
  },
};

function StepProgress({
  start = 0,
  steps,
  onNext,
  onBack,
  activeStep,
  position,
  loadingNext = false,
}) {
  const classes = makeStyles(styles);
  return (
    <MobileStepper
      variant="progress"
      steps={steps}
      position={position}
      activeStep={activeStep}
      className={classes.root}
      nextButton={
        <Button size="small" onClick={onNext} disabled={activeStep >= steps}>
          Next
          {loadingNext ? (
            <Fade in>
              <CircularProgress size={18} />
            </Fade>
          ) : (
            <KeyboardArrowRight />
          )}
        </Button>
      }
      backButton={
        <Button size="small" onClick={onBack} disabled={activeStep === start}>
          <KeyboardArrowLeft />
          Back
        </Button>
      }
    />
  );
}

export default StepProgress;
