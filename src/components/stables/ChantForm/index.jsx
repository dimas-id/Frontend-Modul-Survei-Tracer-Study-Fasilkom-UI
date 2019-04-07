import React from "react";

import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

import FileUploadInput from "../../../components/stables/FileUploadInput";

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
    width: "65vw"
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

function ChantCreateForm({
  classes, title, body, onChantTitle, onChangeBody, onSubmit
}) {
  return (
    <form className={classes.form}>
      <div className={classes.formInline}>
      <Typography component="p" className={classes.label}>
            Judul 
        </Typography>
        <TextField
          autoFocus
          id="title"
          label="Judul Chant hari ini?"
          className={classes.textField}
          onChange={onChantTitle}
          value={title}
          margin="normal"
          variant="outlined"
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
          onChange={onChangeBody}
          margin="normal"
          variant="outlined"
          value={body}
          required
        />
      </div>
      <div className={classes.formInline}>
        <div className={classes.buttonPic}>
        <FileUploadInput 
                  onChange={console.log}
                  accept="application/pdf"/>
                  </div>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={onSubmit}
        >
          Chant!
        </Button>
      </div>
    </form>
  )
}

export default withStyles(styles)(ChantCreateForm);