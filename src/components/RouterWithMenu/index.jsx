import React from "react";
import { withRouter } from "react-router";
import { withStyles } from "@material-ui/core/styles";

import RouterWrapper from "../RouterWrapper";
import MenuList from "../MenuList";

import { Guidelines } from "../../styles";

const styles = theme => ({
  container: {
    ...Guidelines.layouts.flexDirRow
  },
  menuContainer: {
    flex: 1,
    ...Guidelines.layouts.mr8,
    ...Guidelines.layouts.ml8
  },
  routerContainer: {
    flex: 4,
    ...Guidelines.layouts.mr8,
    ...Guidelines.layouts.ml8
  }
});

export default withRouter(
  withStyles(styles)(function RouterWithMenu({ paths, classes, MenuHeaderComponent }) {
    return (
      <div className={classes.container}>
        <div className={classes.menuContainer}>
          {MenuHeaderComponent && <MenuHeaderComponent />}
          <MenuList paths={paths} />
        </div>
        <div className={classes.routerContainer}>
          <RouterWrapper paths={paths} />
        </div>
      </div>
    );
  })
);
