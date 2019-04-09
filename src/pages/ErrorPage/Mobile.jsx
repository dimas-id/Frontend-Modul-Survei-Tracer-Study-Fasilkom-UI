import React from "react";
import PropTypes from "prop-types";
import Typing from "react-typing-animation";
import { Link } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import { NavbarAuth } from "../../components/stables/Navbar";
import { Container } from "../../components/Container";
import { Guidelines } from "../../styles/index.js";
import paths from "../../pages/paths";

const styles = theme => ({
  wrapper: {
    ...Guidelines.layouts.flexDirCol,
    ...Guidelines.layouts.pt128,
    ...Guidelines.layouts.pr32,
    ...Guidelines.layouts.pl32,
    ...Guidelines.layouts.pb32,
    ...Guidelines.layouts.autoMargin,
    ...Guidelines.layouts.flexMiddle
  },
  divWrapper: {
    textAlign: "center",
    ...Guidelines.layouts.mb32
  },
  textWrapper: {
    textAlign: "center"
  }
});

function LandingMobile({ classes }) {
  return (
    <React.Fragment>
    <NavbarAuth />
    <Container className={classes.wrapper}>
      <Typing>
        <div className={classes.divWrapper}>
          <Typography variant="h3" className={classes.textWrapper}>
            <b>
              Ups, ada <i>error</i>
            </b>{" "}
            <span role="img" aria-label="sad">
              😭
            </span>
          </Typography>
          <Typing.Delay ms={3000} />
        </div>
        <div className={classes.divWrapper}>
          <Typography variant="h5" className={classes.textWrapper}>
            Yuk, balik ke {"   "}
            <Button
              variant="outlined"
              color="primary"
              to={paths.HOME}
              component={Link}
            >
              beranda
            </Button>
          </Typography>
        </div>
      </Typing>
    </Container>
  </React.Fragment>
  );
}

LandingMobile.propTypes = {
  classes: PropTypes.shape().isRequired
};

export default withStyles(styles)(LandingMobile);
