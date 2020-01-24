import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import Button from "@material-ui/core/Button";

import NavbarBack from "./NavbarBack";
import paths from "../../../pages/paths";
import { makePathVariableUri } from "../../../libs/navigation";
import { withAuth } from "../../hocs/auth";
import { getUser } from "../../../modules/session/selectors";
import { Grid } from "@material-ui/core";

function NavbarBackWithChannelRequest(props) {
  const { user } = props;

  return (
    <NavbarBack
      Content={
        <Grid container spacing={12} justify="flex-end" alignItems="center">
          <Grid item>
            <Button
              color="secondary"
              component={Link}
              to={makePathVariableUri(paths.CHANNEL_REQUEST_LIST, {
                username: user.username,
              })}
            >
              <b>Riwayat</b>
            </Button>
          </Grid>

          <Grid item>
            <Button
              variant="outlined"
              color="primary"
              inline
              href={paths.CHANNEL_REQUEST}
            >
              <b>Ajukan Channel</b>
            </Button>
          </Grid>
        </Grid>
      }
    />
  );
}

NavbarBackWithChannelRequest.propTypes = {
  inputProps: PropTypes.shape({
    placeholder: PropTypes.string,
  }),
};

NavbarBackWithChannelRequest.defaultProps = {
  inputProps: {
    placeholder: "Search...",
  },
};

function createContainer() {
  const mapStateToProps = state => ({
    user: getUser(state),
  });

  return withAuth(
    withRouter(connect(mapStateToProps)(NavbarBackWithChannelRequest))
  );
}

export default createContainer();
