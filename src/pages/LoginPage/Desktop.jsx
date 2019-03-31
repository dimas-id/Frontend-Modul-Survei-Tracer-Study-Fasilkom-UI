import React from "react";
import { withStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";

import { NavbarAuth } from "../../components/stables/Navbar";
import { Container } from "../../components/Container";
import Particle from "../../components/Particle";

import Login from "./Login";

import { Guidelines } from "../../styles";

const styles = theme => ({
  container: {
    position: "relative",
    ...Guidelines.layouts.windowHeight
  },
  contentContainer: {
    ...Guidelines.layouts.flexDirCol,
    alignItems: "flex-start",
    ...Guidelines.layouts.mt80,
    ...Guidelines.layouts.pt80,
    ...Guidelines.layouts.pl32,
    ...Guidelines.layouts.pr32,
  },
  title: {
    ...Guidelines.layouts.mb64
  },
  loginFormWrapper: {
    width: theme.spacing.unit * 60
  }
});

function LoginMobile({ classes }) {
  return (
    <div className={classes.container}>
      <NavbarAuth position="fixed" />
      <Particle name="cloud2" left={0} />
      <Particle name="cloud1" right={0} bottom="15%" />
      <Particle name="coupleTalk" right={268} bottom="35%" />
      <Container>
        <div className={classes.contentContainer}>
          <div className={classes.loginFormWrapper}>
            <Typography
              gutterBottom
              variant="h4"
              align="left"
              component="h1"
              className={classes.title}
            >
              Masuk ke ILUNI12 Channel
            </Typography>
            <Login />
          </div>
        </div>
      </Container>
    </div>
  );
}

export default withStyles(styles)(LoginMobile);
