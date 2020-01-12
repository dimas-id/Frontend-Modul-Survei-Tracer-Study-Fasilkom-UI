import React from "react";
import { makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";

import { Container } from "../../../components/Container";
import { NavbarAuth } from "../../../components/stables/Navbar";
import Preference from "../../../components/stables/Preference";
import { Guidelines } from "../../../styles";
import { authorize } from "../../../components/hocs/auth";

import StepContext from "../StepContext";
import StepProgress from "../../../components/StepProgress";

const styles = makeStyles(theme => ({
  title: {
    ...Guidelines.fonts.medium,
    fontSize: 32,
  },
  subtitle: {
    ...Guidelines.layouts.mb48,
    fontSize: 20,
  },
}));

function PreferencePage() {
  const classes = styles();
  return (
    <StepContext.Consumer>
      {({ steps, activeStep, handleBack, handleNext }) => (
        <React.Fragment>
          <NavbarAuth />
          <Container>
            <Typography className={classes.title} variant="h5" component="h3">
              Preferensi
            </Typography>
            <Typography className={classes.subtitle} component="p">
              Preferensi Anda yang membantu membuat layanan ILUNI12 Channel
              lebih berguna bagi Anda
            </Typography>
            <Preference />
          </Container>
          <StepProgress
            start={1}
            steps={steps}
            activeStep={activeStep}
            onBack={handleBack}
            onNext={handleNext}
            position="bottom"
          />
        </React.Fragment>
      )}
    </StepContext.Consumer>
  );
}

export default authorize({ mustVerified: false })(PreferencePage);
