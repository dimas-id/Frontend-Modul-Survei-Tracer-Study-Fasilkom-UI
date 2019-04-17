import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";

import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ArrowBack from "@material-ui/icons/ArrowBack";

const styles = theme => ({
  appbar: {
    top: 0,
    backgroundColor: theme.palette.background.paper
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
});

function NavbarBack({ classes, history, title, Content }) {
  return (
    <AppBar position="static" className={classes.appbar}>
      <Toolbar>
        <IconButton
          className={classes.menuButton}
          aria-label="Menu"
          onClick={history.goBack}
        >
          <ArrowBack />
        </IconButton>
        {title && (
          <Typography variant="h6" className={classes.grow}>
            {title}
          </Typography>
        )}
        {Content}
      </Toolbar>
    </AppBar>
  );
}

NavbarBack.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired
  }).isRequired,
  classes: PropTypes.shape().isRequired,
  title: PropTypes.string,
  Content: PropTypes.func
};

NavbarBack.defaultProps = {
  title: "",
  Content: null
};

export default withRouter(withStyles(styles)(NavbarBack));
