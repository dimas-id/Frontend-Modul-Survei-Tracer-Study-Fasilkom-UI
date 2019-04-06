import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import { withAuth } from "../../components/hocs/auth";
import { NavbarBack } from "../../components/stables/Navbar";
import { Container } from "../../components/Container";
import InComplete from "./InComplete";

class UserVerifyPage extends React.PureComponent {
  static propTypes = {
    classes: PropTypes.shape().isRequired
  };

  render() {
    return (
      <React.Fragment>
        <NavbarBack title="Verifikasi" />
        <Container>
          <InComplete />
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
      )(UserVerifyPage)
    )
  );
}

export default createContainer();
