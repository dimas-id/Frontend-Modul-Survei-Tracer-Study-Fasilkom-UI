import React from "react";
import { withRouter } from "react-router";
import Grid from "@material-ui/core/Grid";
import RouterWrapper from "../RouterWrapper";
import MenuList from "../MenuList";

export default withRouter(function RouterWithMenu({
  paths,
  MenuHeaderComponent
}) {
  return (
    <Grid container>
      <Grid item xs={12} md={3} style={{margin: 12}}>
        {MenuHeaderComponent && <MenuHeaderComponent />}
        <MenuList paths={paths} />
      </Grid>
      <Grid item xs={12} md={9} style={{margin: 12}}>
        <RouterWrapper paths={paths} />
      </Grid>
    </Grid>
  );
});
