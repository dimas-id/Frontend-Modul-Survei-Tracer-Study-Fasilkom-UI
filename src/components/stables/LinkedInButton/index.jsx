import React from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";

import Button from "@material-ui/core/Button";

import { isLoggedIn } from "../../../modules/session/selectors";
import env from "../../../config";
import LinkedInLogo from "../../../assets/img/LinkedIn.png";
import { utilityActions } from "../../../modules/utility";

const mapStateToProps = state => ({
  loggedIn: isLoggedIn(state),
});

const mapDispatchToProps = dispatch => ({
  underMaintenance: () =>
    dispatch(
      utilityActions.enqueueSnackbar("Under Maintenance", { variant: "info" })
    ),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(function({
    underMaintenance,
    children,
    isLoggedIn,
    history,
    ...ButtonProps
  }) {
    let timer = null;

    function handleClick() {
      // timer = setTimeout(() => {
      //   window.location.replace(`${env.ATLAS}/api/v1/external-auths/linkedin`)
      // }, 1200)
      underMaintenance();
    }

    React.useEffect(() => {
      return () => {
        if (timer) {
          clearTimeout(timer);
        }
      };
    }, []);

    return (
      <Button variant="outlined" {...ButtonProps} onClick={handleClick}>
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
