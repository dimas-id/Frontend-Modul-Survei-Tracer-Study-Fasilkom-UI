import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ArrowBack from "@material-ui/icons/ArrowBack";
import AddIcon from "@material-ui/icons/Add";
import EmailIcon from "@material-ui/icons/Email";

import paths from "../../../pages/paths";

const styles = theme => ({
  appbar: {
    top: 0,
    backgroundColor: theme.palette.background.paper,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
});

function NavbarBackEmailTemplate({ classes, history, title, Content }) {
  return (
    <AppBar position="static" className={classes.appbar}>
      <Toolbar>
        <IconButton
          className={classes.menuButton}
          aria-label="Menu"
          to={paths.CRM_MAILER}
          component={Link}
        >
          <ArrowBack />
        </IconButton>
        {title && (
          <Typography variant="h6" className={classes.grow}>
            {title}
          </Typography>
        )}
        <Button
          variant="contained"
          color="primary"
          size="small"
          to={paths.CRM_EMAIL_TEMPLATE_CREATE}
          component={Link}
        >
          <AddIcon />
          Buat Templat
        </Button>
      </Toolbar>
    </AppBar>
  );
}

NavbarBackEmailTemplate.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
  classes: PropTypes.shape().isRequired,
  title: PropTypes.string,
  Content: PropTypes.func,
};

NavbarBackEmailTemplate.defaultProps = {
  title: "",
  Content: null,
};

export default withRouter(withStyles(styles)(NavbarBackEmailTemplate));
