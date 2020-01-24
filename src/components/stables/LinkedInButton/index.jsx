import React from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";

import Button from "@material-ui/core/Button";

import { isLoggedIn } from "../../../modules/session/selectors";
import LinkedInLogo from "../../../assets/img/LinkedIn.png";
import env from "../../../config";

const mapStateToProps = state => ({
  loggedIn: isLoggedIn(state),
});

const mapDispatchToProps = () => ({});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(function({
    children,
    isLoggedIn,
    history,
    ...ButtonProps
  }) {
    let timer = null;

    function handleClick() {
      window.notifySnackbar("Membuka halaman login Linkedin...", { variant: "info" });
      timer = setTimeout(() => {
        window.location.replace(`${env.ATLAS}/api/v1/external-auths/linkedin`);
      }, 1000);
    }

    React.useEffect(() => {
      return () => {
        if (timer) {
          clearTimeout(timer);
        }
      };
    }, [timer]);

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
