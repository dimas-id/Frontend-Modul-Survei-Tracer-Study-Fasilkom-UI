import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import { NavbarAuth } from "../../components/stables/Navbar";
import { Container, ContainerFluid } from "../../components/Container";

const styles = theme => ({
  wrapper: {
    boxSizing: "border-box",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px`,
    width: "100%"
  }
});

function LandingMobile({ classes }) {
  return (
    <ContainerFluid>
      <NavbarAuth title="Error" />
      <Container>
        <div className={classes.wrapper}>
          Sorry :(
        </div>
      </Container>
    </ContainerFluid>
  );
}

LandingMobile.propTypes = {
  classes: PropTypes.shape().isRequired
};

export default withStyles(styles)(LandingMobile);
