import React from "react";
import PropTypes from "prop-types";

import {NavLink, withRouter} from "react-router-dom";

import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import {withStyles} from "@material-ui/core/styles";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

const styles = theme => ({
  paper: {
    width: "100%",
  },
  menuItem: {
    height: 64,
    "&:focus": {
      backgroundColor: "#B2F5FF",
      "& $primary, & $icon": {
        color: theme.palette.common.black,
      },
    },
  },
  activeItem: {
    backgroundColor: "#B2F5FF",
  },
  primary: {
    fontSize: 20,
  },
  icon: {},
});

function Menu({classes, paths, location}) {
  const currentPath = location.pathname;
  return (
    <Paper className={classes.paper} elevation={1}>
      <MenuList>
        {paths.map(
          ({menu, title}) =>
            menu && (
              <MenuItem
                key={menu.path}
                className={`${classes.menuItem} ${menu.path === currentPath &&
                  classes.activeItem}`}
                component={NavLink}
                to={menu.path}
              >
                {menu.Icon && (
                  <ListItemIcon className={classes.icon}>
                    {<menu.Icon fontSize="large" />}
                  </ListItemIcon>
                )}
                <ListItemText
                  classes={{primary: classes.primary}}
                  inset
                  primary={title}
                />
              </MenuItem>
            )
        )}
      </MenuList>
    </Paper>
  );
}

Menu.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(Menu));
