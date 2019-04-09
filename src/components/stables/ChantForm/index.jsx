import React from "react";
import Editor from "rich-markdown-editor";

import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

import { layouts, fonts } from "../../../styles/guidelines";

import http from "../../../libs/http";
import env from "../../../config";

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

const savedText = localStorage.getItem("chantBody") || '';
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
          // inputProps={{
          //   maxLength: 200,
          // }}
          error={title.length>200 ? true : false}
          helperText={title.length>200 ? "Judul tidak boleh melebihi 200 karakter" : false}
        />
      </div>
      <div className={classes.formInline}>
      <Typography component="p" className={classes.label}>
            Deskripsi *
          </Typography>
          <div className={classes.textField}>
          <Editor
            placeholder="Deskripsi Chant hari ini?"
            onChange={target => onChangeBody(target())}
            defaultValue={savedText}
            uploadImage={file => {
              console.log("File upload triggered: ", file);
              const data = new FormData();
              data.append("file", file);
              const UPLOAD_ENPOINT = `${env.HELIOS}/api/v1/upload/image`;
              return http
              .put(UPLOAD_ENPOINT, data)
              .then(resp => resp.data.fileUrl) // -> kurang ini
            }}
            />
      </div>
        {/* <TextField
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
        /> */}
      </div>
      <div className={classes.formInline}>
        {/* <div className={classes.buttonPic}> */}
        {/* <FileUploadInput 
                  onChange={console.log}
                  accept="application/pdf"/>
                  </div> */}
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