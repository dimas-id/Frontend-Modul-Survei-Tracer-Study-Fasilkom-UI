import React from "react";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import { Guidelines } from "../../../styles";

const styles = theme => ({
  form: {
    ...Guidelines.layouts.flexDirCol,
    marginTop: 48,
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
  },
  gridBtn: {
    display: "flex",
    justifyContent: "flex-end"
  },
  btn: {
    ...Guidelines.layouts.mt64,
    width: 120
  }
});

export default withStyles(styles)(function(props) {
  const { classes } = props;
  return (
    <form className={classes.form}>
      <Grid container spacing={24}>
        <Grid item xs={3} sm={3} className={classes.gridLabel}>
          <Typography component="p" className={classes.label}>
            Gambar *
          </Typography>
        </Grid>
        <Grid item xs={9} sm={9}>
          <TextField
            id="outlined-text-input"
            className={classes.textField}
            placeholder="Placeholder"
            type="text"
            name="judul"
            autoComplete="judul"
            margin="normal"
            variant="outlined"
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={3} sm={3} className={classes.gridLabel}>
          <Typography component="p" className={classes.label}>
            Judul *
          </Typography>
        </Grid>
        <Grid item xs={9} sm={9}>
          <TextField
            id="outlined-text-input"
            className={classes.textField}
            placeholder="Judul Channel yang diajukan"
            type="text"
            name="judul"
            autoComplete="judul"
            margin="normal"
            variant="outlined"
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={3} sm={3} className={classes.gridLabel}>
          <Typography component="p" className={classes.label}>
            Deskripsi *
          </Typography>
        </Grid>
        <Grid item xs={9} sm={9}>
          <TextField
            id="outlined-text-input"
            className={classes.textField}
            placeholder="Deskripsi Channel yang diajukan"
            type="text"
            name="deskripsi"
            autoComplete="deskripsi"
            margin="normal"
            variant="outlined"
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} sm={12} className={classes.gridBtn}>
          <Button
            className={classes.btn}
            variant="contained"
            color="primary"
            type="submit"
          >
            Simpan
          </Button>
        </Grid>
      </Grid>
    </form>
  );
});
