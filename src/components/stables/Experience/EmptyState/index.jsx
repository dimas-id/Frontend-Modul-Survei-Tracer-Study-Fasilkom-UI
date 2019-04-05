import React from "react";

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import { Guidelines } from "../../../../styles";

const styles = theme => ({
  emptyStateContainer: {
    ...Guidelines.layouts.flexDirCol,
    ...Guidelines.layouts.flexMiddle,
    ...Guidelines.layouts.w100,
    ...Guidelines.layouts.h100
  },
  desc: {
    fontSize: 20,
    maxWidth: 500,
  },
  btn: {
    ...Guidelines.layouts.mt36
  }
});

export default withStyles(styles)(function EmptyState({
  description,
  imgSrc,
  ButtonProps,
  classes
}) {
  return (
    <div className={classes.emptyStateContainer}>
      <img src={imgSrc} alt="Empty" />
      <Typography
        component="p"
        align="center"
        className={classes.desc}
        dangerouslySetInnerHTML={{ __html: description }}
      />
      <Button
        variant="outlined"
        color="primary"
        className={classes.btn}
        {...ButtonProps}
      >
        Tambah
      </Button>
    </div>
  );
});
