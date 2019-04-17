import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import NavbarBack from "./NavbarBack";
import paths from "../../../pages/paths";
import AddIcon from "@material-ui/icons/Add";
import EmailIcon from "@material-ui/icons/Email";
import { withAuth } from "../../hocs/auth";
import { getUser } from "../../../modules/session/selectors";
import { Grid } from "@material-ui/core";

const styles = theme => ({});

class NavbarBackEmailTemplate extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <NavbarBack
        Content={
          <Grid container spacing={24} justify="flex-end" alignItems="center">
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                size="small"
                className={classes.button}
                to={paths.CRM_EMAIL_TEMPLATE_CREATE}
                component={Link}
              >
                <AddIcon className={classes.leftIcon} />
                Buat Templat
              </Button>
            </Grid>

            <Grid item>
              <Button
                variant="outlined"
                color="secondary"
                size="small"
                className={classes.button}
              >
                <EmailIcon className={classes.leftIcon} />
                Email Blaster
              </Button>
            </Grid>
          </Grid>
        }
      />
    );
  }
}

NavbarBackEmailTemplate.propTypes = {
  classes: PropTypes.shape().isRequired,
  inputProps: PropTypes.shape({
    placeholder: PropTypes.string
  })
};

NavbarBackEmailTemplate.defaultProps = {
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
      )(withStyles(styles)(NavbarBackEmailTemplate))
    )
  );
}

export default createContainer();
