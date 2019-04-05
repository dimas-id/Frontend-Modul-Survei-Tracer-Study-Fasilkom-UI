import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

const propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]).isRequired
};

const defaultProps = {
  className: ""
};

const containerStyles = theme => ({
  root: {
    flex: 1,
    flexGrow: 1,
    maxWidth: 1400,
    margin: "0 auto",
    position: "relative",
    padding: "0px 32px",
    [theme.breakpoints.down("sm")]: {
      padding: "0px 20px"
    }
  }
});

export const Container = withStyles(containerStyles)(
  ({ classes, children, className }) => (
    <div className={`${classes.root} ${className}`}>{children}</div>
  )
);

Container.propTypes = propTypes;
Container.defaultProps = defaultProps;

const containerFluidStyles = theme => ({
  root: {
    overflowX: "hidden"
  },
  containerFluid: {
    flex: 1,
    flexGrow: 1,
    width: "100vw",
    position: "relative",
    boxSizing: "border-box"
  }
});

export const ContainerFluid = withStyles(containerFluidStyles)(
  ({ classes, children, className }) => (
    <div className={classes.root}>
      <div className={`${classes.containerFluid} ${className}`}>{children}</div>
    </div>
  )
);

ContainerFluid.propTypes = propTypes;
ContainerFluid.defaultProps = defaultProps;

export const contentStyles = theme => ({
  root: {
    boxSizing: "border-box",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px`,
    width: "100%",
    position: "relative"
  }
});
export const Content = withStyles(contentStyles)(({ classes, children }) => (
  <div className={classes.root}>{children}</div>
));

export default {
  Container,
  ContainerFluid
};
