import React from "react";
import { makeStyles } from "@material-ui/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import Preference from "../../../components/stables/Preference";
import { Guidelines } from "../../../styles";

const styles = makeStyles(theme => ({
  paper: {
    ...Guidelines.layouts.pt32,
    ...Guidelines.layouts.pr32,
    ...Guidelines.layouts.pl32,
    ...Guidelines.layouts.pb32
  },
  title: {
    ...Guidelines.layouts.flexMiddle,
    ...Guidelines.fonts.medium,
    fontSize: 32
  },
  subtitle: {
    ...Guidelines.layouts.flexMiddle,
    ...Guidelines.layouts.mb48,
    fontSize: 20
  },
}));

function PreferencePage() {
  const classes = styles();
  return (
    <React.Fragment>
      <Paper className={classes.paper} elevation={1}>
        <Typography className={classes.title} variant="h5" component="h3">
          Preferensi
        </Typography>
        <Typography className={classes.subtitle} component="p">
          Preferensi Anda yang membantu membuat layanan ILUNI12 Channel lebih
          berguna bagi Anda
        </Typography>
        <Preference />
      </Paper>
    </React.Fragment>
  );
}

export default PreferencePage;
