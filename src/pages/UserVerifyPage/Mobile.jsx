import React from "react";
import { withRouter } from "react-router";

import { authorize } from "../../components/hocs/auth";
import { NavbarBack } from "../../components/stables/Navbar";
import { Container } from "../../components/Container";
import InComplete from "./InComplete";

class UserVerifyPage extends React.PureComponent {
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
  return authorize({ mustVerified: false })(
    withRouter(UserVerifyPage)
  );
}

export default createContainer();
