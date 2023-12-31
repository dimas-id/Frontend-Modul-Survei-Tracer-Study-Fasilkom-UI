import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import { fade } from "@material-ui/core/styles/colorManipulator";

import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";

import NavbarBack from "./NavbarBack";

const styles = theme => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: "100%",
    flexGrow: 1,
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing.unit * 3,
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit",
    width: "100%"
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  }
});

function SearchBar({ classes, inputProps }) {
  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        key="navbar-search-input"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput
        }}
        {...inputProps}
      />
    </div>
  );
}

export function NavbarBackWithSearch(props) {
  return <NavbarBack Content={<SearchBar {...props} />} />;
}

NavbarBackWithSearch.propTypes = {
  classes: PropTypes.shape().isRequired,
  inputProps: PropTypes.shape({
    placeholder: PropTypes.string
  })
};

NavbarBackWithSearch.defaultProps = {
  inputProps: {
    placeholder: "Search..."
  }
};

export default withStyles(styles)(NavbarBackWithSearch);
