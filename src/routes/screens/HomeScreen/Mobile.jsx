import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import withAuth from "components-hoc/withAuth";
import { NavbarAuth } from "components-stable/Navbar";
import { Container, ContainerFluid } from "components/Container";

const styles = theme => ({
  wrapper: {
    boxSizing: "border-box",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px`,
    width: "100%"
  }
});

function HomeMobile({ classes }) {
  return (
    <ContainerFluid>
      <NavbarAuth title="Home" />
      <Container>
        <div className={classes.wrapper} />
      </Container>
    </ContainerFluid>
  );
}

HomeMobile.propTypes = {
  classes: PropTypes.shape().isRequired
};

export default withAuth(withStyles(styles)(HomeMobile));
