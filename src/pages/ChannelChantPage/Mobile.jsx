import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import { withStyles } from "@material-ui/core/styles";

import { authorize } from "../../components/hocs/auth";
import { NavbarAuth } from "../../components/stables/Navbar";
import { Container, ContainerFluid } from "../../components/Container";

const styles = theme => ({});

class Screen extends React.PureComponent {
  static propTypes = {
    classes: PropTypes.shape().isRequired
  };

  render() {
    // const { classes } = this.props;
    return (
      <ContainerFluid>
        <NavbarAuth title="Screen" />
        <Container>Screen</Container>
      </ContainerFluid>
    );
  }
}

function createContainer() {
  const mapStateToProps = state => ({});

  const mapDispatchToProps = dispatch => ({});

  return authorize({ mustVerified: true })(
    withRouter(
      connect(
        mapStateToProps,
        mapDispatchToProps
      )(withStyles(styles)(Screen))
    )
  );
}

export default createContainer();
