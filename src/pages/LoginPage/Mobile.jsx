import React from "react";
import { withStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";

import { NavbarModal } from "../../components/stables/Navbar";
import Particle from "../../components/Particle";
import { Container } from "../../components/Container";

import Login from "./Login";
import { Guidelines } from "../../styles";
import Logo from "../../assets/logo.svg";

function LoginMobile({ classes }) {
  return (
    <Container className={classes.container}>
      <NavbarModal position="fixed" />
      <Particle name="cloud1" bottom={0} right={0} />
      <div className={classes.loginWrapper}>
        <img alt="logo" src={Logo} className={classes.logo} />
        <Typography gutterBottom variant="h5" align="center" component="h1">
          Masuk ke ILUNI12 Channel
        </Typography>
        <Login />
      </div>
    </Container>
  );
}

export default withStyles(theme => ({
  container: {
    position: "relative",
    ...Guidelines.layouts.windowHeight
  },
  loginWrapper: {
    ...Guidelines.layouts.h100,
    ...Guidelines.layouts.flexDirCol,
    ...Guidelines.layouts.flexMiddle
  },
  logo: {
    marginBottom: theme.spacing.unit * 8
  }
}))(LoginMobile);
