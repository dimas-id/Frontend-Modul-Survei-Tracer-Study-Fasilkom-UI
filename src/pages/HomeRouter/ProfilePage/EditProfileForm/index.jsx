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
  const { classes } = props;
  return (
    <form className={classes.form}>
      <Grid container spacing={24}>
        <Grid item xs={3} sm={3} className={classes.gridLabel}>
          <Typography component="p" className={classes.label}>
            Nama Depan
          </Typography>
        </Grid>
        <Grid item xs={9} sm={9}>
          <TextField
            id="outlined-first-name"
            className={classes.textField}
            margin="normal"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={3} sm={3} className={classes.gridLabel}>
          <Typography component="p" className={classes.label}>
            Nama Belakang
          </Typography>
        </Grid>
        <Grid item xs={9} sm={9}>
          <TextField
            id="outlined-last-name"
            className={classes.textField}
            margin="normal"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={3} sm={3} className={classes.gridLabel}>
          <Typography component="p" className={classes.label}>
            Tanggal Lahir
          </Typography>
        </Grid>
        <Grid item xs={9} sm={9}>
          <TextField
            id="outlined-birthdate"
            type="date"
            className={classes.textField}
            margin="normal"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={3} sm={3} className={classes.gridLabel}>
          <Typography component="p" className={classes.label}>
            Email
          </Typography>
        </Grid>
        <Grid item xs={9} sm={9}>
          <TextField
            disabled
            id="outlined-email"
            className={classes.textField}
            margin="normal"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={3} sm={3} className={classes.gridLabel}>
          <Typography component="p" className={classes.label}>
            Nomor Telepon
          </Typography>
        </Grid>
        <Grid item xs={9} sm={9}>
          <TextField
            id="outlined-phone-number"
            keyboardType="numeric"
            className={classes.textField}
            margin="normal"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={3} sm={3} className={classes.gridLabel}>
          <Typography component="p" className={classes.label}>
            Kota
          </Typography>
        </Grid>
        <Grid item xs={9} sm={9}>
          <TextField
            id="outlined-city"
            className={classes.textField}
            margin="normal"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={3} sm={3} className={classes.gridLabel}>
          <Typography component="p" className={classes.label}>
            Negara
          </Typography>
        </Grid>
        <Grid item xs={9} sm={9}>
          <TextField
            id="outlined-country"
            className={classes.textField}
            margin="normal"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={3} sm={3} className={classes.gridLabel}>
          <Typography component="p" className={classes.label}>
            Website
          </Typography>
        </Grid>
        <Grid item xs={9} sm={9}>
          <TextField
            id="outlined-website"
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
