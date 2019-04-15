import React from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";

import Button from "@material-ui/core/Button";

import { isLoggedIn } from "../../../modules/session/selectors";
import env from "../../../config";
import paths from "../../../pages/paths";
import LinkedInLogo from "../../../assets/img/LinkedIn.png";
import { isDevelopment } from "../../../config";

const mapStateToProps = state => ({
  loggedIn: isLoggedIn(state)
});

export default withRouter(
  connect(
    mapStateToProps,
    null
  )(function({ children, isLoggedIn, history, ...ButtonProps }) {
    if (isLoggedIn) {
      history.replace(paths.HOME);
    }

    const tempConfig = {};
    if (isDevelopment) {
      tempConfig.href = `${env.ATLAS}/api/v1/external-auths/linkedin`;
    } else {
      tempConfig.onClick = () => {
        window.notifySnackbar(
          "Sorry for inconvenience, LinkedIn only works on local for now :(",
          { variant: "info" }
        );
      };
    }

    return (
      <Button variant="outlined" {...ButtonProps} {...tempConfig}>
        <img
          src={LinkedInLogo}
          alt="LinkedIn"
          style={{ marginLeft: 8, marginRight: 8 }}
        />
        {children}
      </Button>
    );
  })
);
