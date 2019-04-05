import React from "react";
import PropTypes from "prop-types";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Link } from "react-router-dom";

const styles = theme => ({
  paper: {
    width: "100%"
  },
  menuItem: {
    height: 64,
    "&:focus": {
      backgroundColor: "#B2F5FF",
      "& $primary, & $icon": {
        color: theme.palette.common.black
      }
    }
  },
  primary: {
    fontSize: 20
  },
  icon: {}
});

function Menu({ classes, paths }) {
  return (
    <Paper className={classes.paper}>
      <MenuList>
        {paths.map(
          ({ menu, title }) =>
            menu && (
              <MenuItem
                className={classes.menuItem}
                component={Link}
                to={menu.path}
              >
                {menu.Icon && (
                  <ListItemIcon className={classes.icon}>
                    {<menu.Icon fontSize="large" />}
                  </ListItemIcon>
                )}
                <ListItemText
                  classes={{ primary: classes.primary }}
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
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Menu);
