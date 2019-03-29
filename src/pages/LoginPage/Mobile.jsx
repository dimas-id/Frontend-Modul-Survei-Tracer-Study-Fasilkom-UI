import React from "react";
import { withStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";

import { NavbarModal } from "../../components/stables/Navbar";
import Particle from "../../components/Particle";

import Login from "./Login";
import { Guidelines } from "../../styles";
import Logo from "../../assets/logo.svg";

function LoginMobile({ classes }) {
  return (
    <div className={classes.container}>
      <NavbarModal position="fixed" />
      <Particle name="cloud1" bottom={0} right={0} />
      <img alt="logo" src={Logo} className={classes.logo} />
      <div className={classes.loginWrapper}>
        <Typography gutterBottom variant="h5" align="center" component="h1">
          Masuk ke ILUNI12 Channel
        </Typography>
        <Login />
      </div>
    </div>
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
    ...Guidelines.layouts.flexMiddle,
    ...Guidelines.layouts.pl32,
    ...Guidelines.layouts.pr32
  },
  logo: {
    top: theme.spacing.unit * 16,
    ...Guidelines.layouts.posAbsHorizontalCenter
  }
}))(LoginMobile);
