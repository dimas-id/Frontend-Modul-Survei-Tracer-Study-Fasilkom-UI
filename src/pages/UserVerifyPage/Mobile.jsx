import React from "react";
import { withRouter } from "react-router";

import { authorize } from "../../components/hocs/auth";
import InComplete from "./InComplete";

class UserVerifyPage extends React.PureComponent {
  render() {
    return <InComplete />;
  }
}

function createContainer() {
  return authorize({ mustVerified: false })(withRouter(UserVerifyPage));
}

export default createContainer();
