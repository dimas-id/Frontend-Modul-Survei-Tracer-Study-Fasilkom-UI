import React from "react";

import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { Guidelines } from "../../../styles";

const styles = theme => ({
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
    fontSize: 16
  },
  paperChild: {
    ...Guidelines.layouts.mt24,
    ...Guidelines.layouts.pt24,
    ...Guidelines.layouts.pr24,
    ...Guidelines.layouts.pl24,
    ...Guidelines.layouts.pb24
  },
  titleChild: {
    ...Guidelines.fonts.bold,
    fontSize: 28
  },
});

export default withStyles(styles)(function(props) {
  const { classes } = props;
  return (
    <React.Fragment>
      <Paper className={classes.paper} elevation={1}>
        <Typography className={classes.title} variant="h5" component="h3">
          Info Pribadi
        </Typography>
        <Typography className={classes.subtitle} component="p">
          Info pribadi yang Anda gunakan di layanan ILUNI12 Channel
        </Typography>
        <Paper className={classes.paperChild} elevation={1}>
          <Typography className={classes.titleChild} variant="h5" component="h3">
            Profil
          </Typography>
        </Paper>

        <Paper className={classes.paperChild} elevation={1}>
          <Typography className={classes.titleChild} variant="h5" component="h3">
            Kata Sandi
          </Typography>
        </Paper>

        <Paper className={classes.paperChild} elevation={1}>
          <Typography className={classes.titleChild} variant="h5" component="h3">
            Edukasi
          </Typography>
        </Paper>

        <Paper className={classes.paperChild} elevation={1}>
          <Typography className={classes.titleChild} variant="h5" component="h3">
            Posisi Pekerjaan
          </Typography>
        </Paper>

        
      </Paper>
    </React.Fragment>
  );
});
