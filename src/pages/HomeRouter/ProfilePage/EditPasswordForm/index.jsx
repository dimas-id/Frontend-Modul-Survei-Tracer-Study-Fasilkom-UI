import React from "react";
import { connect } from "react-redux";

import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";

import { getUser } from "../../../../modules/session/selectors";
import { Guidelines } from "../../../../styles";


const styles = theme => ({
  form: {
    ...Guidelines.layouts.flexDirCol,
    marginTop: 32
  },
  gridLabel: {
    display: "flex",
    alignItems: "center"
  },
  label: {
    fontSize: 16,
    ...Guidelines.fonts.bold
  },
  textField: {
    ...Guidelines.layouts.w100
  },
  btn: {
    ...Guidelines.layouts.mt64,
    width: 120
  }
});

function EditProfileForm(props) {
  console.log(user);
  const { classes, user } = props;
  return (
    <form className={classes.form}>
      <Grid container spacing={24}>
        <Grid item xs={3} sm={3} className={classes.gridLabel}>
          <Typography component="p" className={classes.label}>
            Kata sandi saat ini 
          </Typography>
        </Grid>
        <Grid item xs={9} sm={9}>
          <TextField
            id="outlined-current-password"
            className={classes.textField}
            margin="normal"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={3} sm={3} className={classes.gridLabel}>
          <Typography component="p" className={classes.label}>
            Kata sandi baru
          </Typography>
        </Grid>
        <Grid item xs={9} sm={9}>
          <TextField
            id="outlined-new-password"
            className={classes.textField}
            margin="normal"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={3} sm={3} className={classes.gridLabel}>
          <Typography component="p" className={classes.label}>
            Verifikasi kata sandi
          </Typography>
        </Grid>
        <Grid item xs={9} sm={9}>
          <TextField
            id="outlined-new-password-confirm"
            className={classes.textField}
            margin="normal"
            variant="outlined"
          />
        </Grid>
      </Grid>
    </form>
  );
}

export default connect(state => ({
  user: getUser(state)
}))(withStyles(styles)(EditProfileForm));
