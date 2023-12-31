import React from "react";

import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import Typography from "@material-ui/core/Typography";

import { Guidelines } from "../../../../styles";

const styles = theme => ({
  headContainer: {
    ...Guidelines.layouts.flexDirRow,
    ...Guidelines.layouts.flexMiddleSpaceBetween,
    ...Guidelines.layouts.w100,
    ...Guidelines.layouts.h100,
    alignItems: "flex-start"
  },
  title: {
    ...Guidelines.fonts.heading1
  }
});

export default withStyles(styles)(function Title({
  children,
  ButtonProps,
  classes
}) {
  const { hidden } = ButtonProps || {};
  return (
    <div className={classes.headContainer}>
      <Typography
        component="h1"
        variant="h4"
        align="left"
        className={classes.title}
        dangerouslySetInnerHTML={{ __html: children }}
      />
      {!hidden && (
        <IconButton aria-label="Add" {...ButtonProps}>
          <AddIcon />
        </IconButton>
      )}
    </div>
  );
});
