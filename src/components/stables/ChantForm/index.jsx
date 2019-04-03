import React from "react";

import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import AttachmentIcon from "@material-ui/icons/Attachment";

import { layouts, fonts } from "../../../styles/guidelines";

const styles = theme => ({
  form: {
    ...layouts.flexDirCol
  },
  formInline: {
    ...layouts.mt16,
    ...layouts.flexDirRow,
    justifiyContent: "space-between"
  },
  textField: {
    ...layouts.w100,
    width: "75vw"
  },
  label: {
    ...layouts.marginAuto,
    ...fonts.bold
  },
  button: {
    ...layouts.marginAuto,
    width: "10vw",
    color: "white"
  },
  buttonPic: {
    ...layouts.marginAuto,
  }
});

export default withStyles(styles)(function(props) {
  const { classes } = props;
  return (
    <form className={classes.form}>
      <div className={classes.formInline}>
      <Typography component="p" className={classes.label}>
            Judul *
        </Typography>
        <TextField
          autoFocus
          id="title"
          label="Judul Chant hari ini?"
          className={classes.textField}
          margin="normal"
          variant="outlined"
          required
        />
      </div>
      <div className={classes.formInline}>
      <Typography component="p" className={classes.label}>
            Deskripsi *
          </Typography>
        <TextField
          id="descritpion"
          label="Deskripsi Chant hari ini?"
          multiline
          rowsMax="5"
          className={classes.textField}
          margin="normal"
          variant="outlined"
          required
        />
      </div>
      <div className={classes.formInline}>
        <Button className={classes.buttonPic}>
          <AttachmentIcon />
        </Button>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          type="submit"
        >
          Chant!
        </Button>
      </div>
    </form>
  );
});
