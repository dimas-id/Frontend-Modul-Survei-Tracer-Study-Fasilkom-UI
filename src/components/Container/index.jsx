import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
};

const containerStyles = theme => ({
  root: {
    flex: 1,
    flexGrow: 1,
    maxWidth: 1200,
    margin: '0 auto',
    position: 'relative',
  },
});

export const Container = withStyles(containerStyles)(
  ({ classes, children }) => <div className={classes.root}>{children}</div>
);

Container.propTypes = propTypes;

const containerFluidStyles = theme => ({
  root: {
    flex: 1,
    flexGrow: 1,
    width: '100vw',
    position: 'relative',
    boxSizing: 'border-box',
  },
});

export const ContainerFluid = withStyles(containerFluidStyles)(
  ({ classes, children }) => <div className={classes.root}>{children}</div>
);

ContainerFluid.propTypes = propTypes;

export const contentStyles = theme => ({
  root: {
    boxSizing: 'border-box',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px`,
    width: '100%',
    position: 'relative',
  },
});
export const Content = withStyles(contentStyles)(({ classes, children }) => (
  <div className={classes.root}>{children}</div>
));

export default {
  Container,
  ContainerFluid,
};
