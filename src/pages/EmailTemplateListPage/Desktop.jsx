import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import { withStyles } from "@material-ui/core/styles";

import { withAuth } from "../../components/hocs/auth";
import {
  NavbarAuth,
  NavbarEmailTemplate
} from "../../components/stables/Navbar";
import { Container } from "../../components/Container";

import EmailTemplateList from "./EmailTemplateList";
import { Guidelines } from "../../styles";

const styles = theme => ({
  container: {
    ...Guidelines.layouts.flexDirRow,
    ...Guidelines.layouts.mt32,
    ...Guidelines.layouts.mr64,
    ...Guidelines.layouts.ml64
  }
});

class Screen extends React.PureComponent {
  static propTypes = {
    classes: PropTypes.shape().isRequired
  };

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <NavbarAuth title="Daftar Kontak" />
        <NavbarEmailTemplate />
        <Container className={classes.container}>
          <EmailTemplateList />
        </Container>
      </React.Fragment>
    );
  }
}

function createContainer() {
  const mapStateToProps = state => ({});

  const mapDispatchToProps = dispatch => ({});

  return withAuth(
    withRouter(
      connect(
        mapStateToProps,
        mapDispatchToProps
      )(withStyles(styles)(Screen))
    )
  );
}

export default createContainer();