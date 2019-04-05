import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";

import { withAuth } from "../../../components/hocs/auth";
import { NavbarAuth } from "../../../components/stables/Navbar";
import { Container } from "../../../components/Container";
import WorkPosition from "../../../components/stables/Experience/WorkPosition";

const styles = theme => ({});

class WorkPositionPage extends React.PureComponent {
  static propTypes = {
    classes: PropTypes.shape().isRequired
  };

  render() {
    return (
      <React.Fragment>
        <NavbarAuth />
        <Container>
          <WorkPosition />
        </Container>
      </React.Fragment>
    );
  }
}

function createContainer() {
  return withAuth(withStyles(styles)(WorkPositionPage));
}

export default createContainer();
