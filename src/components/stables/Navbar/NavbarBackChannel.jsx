import React from "react";
import PropTypes from "prop-types";
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

const styles = theme => ({
    buttonCreate : {
        textAlign: "right"
    }
});




class NavbarBackChannel extends React.Component {
    
    handleReply = () => {
        this.props.history.push(
          makePathVariableUri(paths.CHANNEL_CHANT_CREATE, {
            channelId: this.props.channelId
          }),
          {
            parentId: this.props.chantId
          }
        );
      };

  render() {
    const { classes } = this.props;

    return (
      <NavbarBack
        Content={() => (
          <Grid container spacing={24} >
            <Grid item xs={8}>
            </Grid>
            <Grid item xs={4} className={classes.buttonCreate} justify="flex-end" float="right">
              <Button
                variant="outlined"
                color="primary"
                onClick={this.handleReply}
                className={classes.button}
              >
                <b>Buat Chant</b>
              </Button>
            </Grid>
          </Grid>
        )}
      />
    );
  }
}

NavbarBackChannel.propTypes = {
  classes: PropTypes.shape().isRequired,
  inputProps: PropTypes.shape({
    placeholder: PropTypes.string
  })
};

NavbarBackChannel.defaultProps = {
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
      )(withStyles(styles)(NavbarBackChannel))
    )
  );
}

export default createContainer();
