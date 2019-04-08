import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import { Guidelines } from "../../../styles";
import FileUploadInput from "../../stables/FileUploadInput";

const styles = theme => ({
  form: {
    ...Guidelines.layouts.flexDirCol,
    marginTop: 48
  },
  gridLabel: {
    display: "flex",
    alignItems: "center"
  },
  label: {
    fontSize: 16,
    ...Guidelines.fonts.bold
  },
  textField: {},
  gridBtn: {
    display: "flex",
    justifyContent: "flex-end"
  },
  btn: {
    ...Guidelines.layouts.mt64,
    width: 120
  }
});

function ChannelRequestForm({
  classes,
  coverImgUrl,
  title,
  description,
  onChangeCoverImgUrl,
  onChangeTitle,
  onChangeDescription,
  onSubmit
}) {
  return (
    <form className={classes.form}>
      <Grid container spacing={24}>
        <Grid item xs={3} sm={3} className={classes.gridLabel}>
          <Typography component="p" className={classes.label}>
            Gambar *
          </Typography>
        </Grid>
        <Grid item xs={9} sm={9}>
          <FileUploadInput accept="image/*" onChange={onChangeCoverImgUrl} />
        </Grid>
        <Grid item xs={3} sm={3} className={classes.gridLabel}>
          <Typography component="p" className={classes.label}>
            Judul *
          </Typography>
        </Grid>
        <Grid item xs={9} sm={9}>
          <TextField
            id="outlined-title"
            className={classes.textField}
            placeholder="Judul Channel yang diajukan"
            type="text"
            name="title"
            margin="normal"
            variant="outlined"
            onChange={onChangeTitle}
            value={title}
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
            id="outlined-description"
            className={classes.textField}
            placeholder="Deskripsi Channel yang diajukan"
            type="text"
            name="description"
            margin="normal"
            variant="outlined"
            onChange={onChangeDescription}
            value={description}
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
            onClick={onSubmit}
          >
            Simpan
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

ChannelRequestForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ChannelRequestForm);
