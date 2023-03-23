import React from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { authorize, ROLES } from "../../components/hocs/auth";
import { Guidelines } from "../../styles";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Pertanyaan from "../../components/Pertanyaan";

const styles = theme => ({
  container: {
    ...Guidelines.layouts.mt32,
    ...Guidelines.layouts.pr40,
    ...Guidelines.layouts.pl40,
  },
});

class Screen extends React.Component {
  static propTypes = {
    classes: PropTypes.shape().isRequired,
    location: PropTypes.object.isRequired,
  };

  render() {
    return (
      <React.Fragment>
        <div
          style={{
            backgroundColor: "#F6F1F1",
            minHeight: "100vh",
          }}
        >
          <Pertanyaan />
        </div>
        <ToastContainer />
      </React.Fragment>
    );
  }
}

function createContainer() {
  return authorize({
    mustVerified: true,
    roles: [ROLES.STAFF, ROLES.PUBLIC],
  })(withRouter(withStyles(styles)(Screen)));
}

export default createContainer();
