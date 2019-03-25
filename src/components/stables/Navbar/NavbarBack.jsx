import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ArrowBack from '@material-ui/icons/ArrowBack';

const styles = {
  appbar: {
    top: 0,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

function NavbarBack({ classes, history, title, Content }) {
  return (
    <AppBar position="static" className={classes.appbar}>
      <Toolbar>
        <IconButton
          className={classes.menuButton}
          color="inherit"
          aria-label="Menu"
          onClick={history.goBack}
        >
          <ArrowBack />
        </IconButton>
        {title && (
          <Typography variant="h6" color="inherit" className={classes.grow}>
            {title}
          </Typography>
        )}
        {Content && <Content />}
      </Toolbar>
    </AppBar>
  );
}

NavbarBack.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
  classes: PropTypes.shape().isRequired,
  title: PropTypes.string,
  Content: PropTypes.func,
};

NavbarBack.defaultProps = {
  title: '',
  Content: null,
};

export default withRouter(withStyles(styles)(NavbarBack));
