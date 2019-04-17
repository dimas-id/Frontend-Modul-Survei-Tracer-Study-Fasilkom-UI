import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import NavbarBack from "./NavbarBack";
import paths from "../../../pages/paths";
import { makePathVariableUri } from "../../../libs/navigation";
import { withAuth } from "../../hocs/auth";
import { getUser } from "../../../modules/session/selectors";
import { Grid } from "@material-ui/core";

const styles = theme => ({});

class NavbarBackWithChannelRequest extends React.Component {
  render() {
    const { classes, user } = this.props;

    return (
      <NavbarBack
        Content={(
          <Grid container spacing={24} justify="flex-end" alignItems="center">
            <Grid item>
              <Button
                color="secondary"
                component={Link}
                className={classes.button}
                to={makePathVariableUri(paths.CHANNEL_REQUEST_LIST, {
                  username: user.username
                })}
              >
                <b>Riwayat Pengajuan Channel</b>
              </Button>
            </Grid>

            <Grid item>
              <Button
                variant="outlined"
                color="primary"
                href={paths.CHANNEL_REQUEST}
                className={classes.button}
              >
                <b>Ajukan Channel</b>
              </Button>
            </Grid>
          </Grid>
        )}
      />
    );
  }
}

NavbarBackWithChannelRequest.propTypes = {
  classes: PropTypes.shape().isRequired,
  inputProps: PropTypes.shape({
    placeholder: PropTypes.string
  })
};

NavbarBackWithChannelRequest.defaultProps = {
  inputProps: {
    placeholder: "Search..."
  }
};

function createContainer() {
  const mapStateToProps = state => ({
    user: getUser(state)
  });

  const mapDispatchToProps = dispatch => ({});

  return withAuth(
    withRouter(
      connect(
        mapStateToProps,
        mapDispatchToProps
      )(withStyles(styles)(NavbarBackWithChannelRequest))
    )
  );
}

export default createContainer();
