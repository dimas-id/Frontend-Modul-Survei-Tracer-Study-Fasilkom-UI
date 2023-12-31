import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";

import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Close from "@material-ui/icons/Close";

const styles = theme => ({
  appbar: {
    top: 0,
    backgroundColor: theme.palette.background.paper,
    boxShadow: "None"
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
    color: "black"
  },
  title: {
    color: "black"
  }
});

function NavbarModal({ classes, history, title, Content, onClick, ...props }) {
  return (
    <AppBar position="static" className={classes.appbar} {...props}>
      <Toolbar>
        <IconButton
          className={classes.menuButton}
          aria-label="Menu"
          onClick={onClick || history.goBack}
        >
          <Close />
        </IconButton>
        {title && (
          <Typography variant="h6" className={classes.title}>
            {title}
          </Typography>
        )}
        {Content && <Content />}
      </Toolbar>
    </AppBar>
  );
}

NavbarModal.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired
  }).isRequired,
  classes: PropTypes.shape().isRequired,
  title: PropTypes.string,
  Content: PropTypes.func
};

NavbarModal.defaultProps = {
  title: "",
  Content: null
};

export default withRouter(withStyles(styles)(NavbarModal));
