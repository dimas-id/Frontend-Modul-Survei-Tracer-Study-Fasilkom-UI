import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';

import { logout } from '../../../modules/session/thunks';
import { isLoggedIn as _isLoggedIn } from '../../../modules/session/selectors';
import { LOGIN } from '../../../pages/paths';

const styles = theme => ({
  appbar: {
    top: 0,
  },
  title: {
    flexGrow: 1,
  },
});

class NavbarAuth extends React.Component {
  static propTypes = {
    classes: PropTypes.shape().isRequired,
    title: PropTypes.string.isRequired,
  };

  state = {
    anchorEl: null,
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleLogout = async () => {
    try {
      await this.props.logout();
      this.props.history.push(LOGIN);
    } catch (error) {}
  };

  render() {
    const { classes, title, isLoggedIn } = this.props;
    const open = Boolean(this.state.anchorEl);
    return (
      <AppBar position="sticky" className={classes.appbar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.title}>
            {title}
          </Typography>
          {isLoggedIn && (
            <div>
              <IconButton
                aria-owns={open ? 'menu-appbar' : undefined}
                aria-haspopup="true"
                onClick={this.handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={this.state.anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={this.handleClose}
              >
                <MenuItem onClick={this.handleClose}>Account</MenuItem>
                <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    );
  }
}

function createContainer() {
  const mapStateToProps = state => ({
    isLoggedIn: _isLoggedIn(state),
  });

  const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout()),
  });

  return withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(withStyles(styles)(NavbarAuth))
  );
}

export default createContainer();
