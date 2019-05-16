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
    marginTop: 48,
  },
  gridLabel: {
    display: "flex",
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    ...Guidelines.fonts.bold,
  },
  textField: {
    marginTop: 0,
    marginBottom: 0,
  },
  gridBtn: {
    display: "flex",
    justifyContent: "flex-end",
  },
  btn: {
    ...Guidelines.layouts.mt64,
    width: 120,
  },
});

function ChannelRequestForm({
  classes,
  coverImgUrl,
  title,
  description,
  error,
  onChangeCoverImgUrl,
  onChangeTitle,
  onChangeDescription,
  onSubmit,
  type,
}) {
  return (
    <form className={classes.form}>
      <Grid container spacing={24}>
        <Grid item xs={12} sm={3} className={classes.gridLabel}>
          <Typography component="p" className={classes.label}>
            Gambar *
          </Typography>
        </Grid>
        <Grid item xs={12} sm={9}>
          <Grid container spacing={24}>
            {type === "update" ? (
              <Grid item xs={2} sm={2}>
                <img
                  style={{
                    width: 80,
                    height: 80,
                    objectFit: "cover",
                  }}
                  src={coverImgUrl}
                  alt="cover channel"
                />
              </Grid>
            ) : null}

            <Grid item xs={2} sm={2}>
              <FileUploadInput
                accept="image/*"
                onChange={onChangeCoverImgUrl}
                value={coverImgUrl}
              />
              {Boolean(error.coverImgUrl) ? (
                <div style={{ color: "red", fontSize: 10 }}>
                  Gambar wajib diunggah.
                </div>
              ) : null}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={3} className={classes.gridLabel}>
          <Typography component="p" className={classes.label}>
            Judul *
          </Typography>
        </Grid>
        <Grid item xs={12} sm={9}>
          <TextField
            required
            id="outlined-title"
            className={classes.textField}
            label="Judul Channel yang diajukan?"
            type="text"
            name="title"
            margin="normal"
            variant="outlined"
            onChange={onChangeTitle}
            value={title}
            error={Boolean(error.title)}
            helperText={error.title}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={3} className={classes.gridLabel}>
          <Typography component="p" className={classes.label}>
            Deskripsi *
          </Typography>
        </Grid>
        <Grid item xs={12} sm={9}>
          <TextField
            required
            id="outlined-description"
            className={classes.textField}
            label="Deskripsi Channel yang diajukan?"
            type="text"
            name="description"
            margin="normal"
            variant="outlined"
            onChange={onChangeDescription}
            value={description}
            error={Boolean(error.description)}
            helperText={error.description}
            fullWidth
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
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChannelRequestForm);
