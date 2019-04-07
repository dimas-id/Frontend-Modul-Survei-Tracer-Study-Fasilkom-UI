import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";

import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

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

function Navbar({ classes, history, title, content }) {
  return (
    <AppBar position="static" className={classes.appbar}>
      <Toolbar>
        {title && (
          <Typography variant="h6" className={classes.grow}>
            {title}
          </Typography>
        )}
        {content}
      </Toolbar>
    </AppBar>
  );
}

Navbar.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired
  }).isRequired,
  classes: PropTypes.shape().isRequired,
  title: PropTypes.string,
  content: PropTypes.func
};

Navbar.defaultProps = {
  title: "",
  content: null
};

export default withRouter(withStyles(styles)(Navbar));
