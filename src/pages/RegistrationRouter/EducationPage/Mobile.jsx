import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";

import { withAuth } from "../../../components/hocs/auth";
import { NavbarAuth } from "../../../components/stables/Navbar";
import { Container } from "../../../components/Container";
import Education from "../../../components/stables/Experience/Education";

const styles = theme => ({});

class EducationPage extends React.PureComponent {
  static propTypes = {
    classes: PropTypes.shape().isRequired
  };

  render() {
    return (
      <React.Fragment>
        <NavbarAuth />
        <Container>
          <Education />
        </Container>
      </React.Fragment>
    );
  }
}

function createContainer() {
  return withAuth(withStyles(styles)(EducationPage));
}

export default createContainer();
