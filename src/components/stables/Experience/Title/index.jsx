import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Typography from "@material-ui/core/Typography";

import { Guidelines } from "../../../../styles";

const styles = theme => ({
  emptyStateContainer: {
    ...Guidelines.layouts.flexDirRow,
    ...Guidelines.layouts.flexMiddleSpaceBetween,
    ...Guidelines.layouts.w100,
    ...Guidelines.layouts.h100
  },
  title: {
    ...Guidelines.fonts.heading1
  }
});

export default withStyles(styles)(function EmptyState({
  children,
  ButtonProps,
  classes
}) {
  const { hidden } = ButtonProps || {};
  return (
    <div className={classes.emptyStateContainer}>
      <Typography
        component="h1"
        variant="h4"
        align="center"
        className={classes.title}
        dangerouslySetInnerHTML={{ __html: children }}
      />
      {!hidden && (
        <Fab
          size="small"
          color="primary"
          aria-label="Add"
          children={<AddIcon />}
          {...ButtonProps}
        />
      )}
    </div>
  );
});
