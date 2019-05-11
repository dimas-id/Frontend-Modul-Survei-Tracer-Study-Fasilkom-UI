import React from "react";

import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {withStyles} from "@material-ui/core/styles";

import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import {layouts, fonts} from "../../../styles/guidelines";
import {CustomUploadAdapterPlugin} from "./UploadAdapter";

const styles = theme => ({
  form: {
    ...layouts.flexDirCol,
  },
  formInline: {
    ...layouts.mt16,
    ...layouts.flexDirRow,
    justifiyContent: "space-between",
  },
  textField: {
    ...layouts.w100,
    width: "65vw",
  },
  label: {
    ...layouts.marginAuto,
    ...fonts.bold,
  },
  button: {
    ...layouts.marginAuto,
    width: "10vw",
    color: "white",
  },
  buttonPic: {
    ...layouts.marginAuto,
  },
});

function ChantCreateForm({
  classes,
  title,
  body,
  onChantTitle,
  onChangeBody,
  onSubmit,
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
          error={title.length > 200 ? true : false}
          helperText={
            title.length > 200
              ? "Judul tidak boleh melebihi 200 karakter"
              : false
          }
        />
      </div>
      <div className={classes.formInline}>
        <Typography component="p" className={classes.label}>
          Deskripsi *
        </Typography>
        <div className={classes.textField}>
          <CKEditor
            editor={ClassicEditor}
            config={{
              extraPlugins: [CustomUploadAdapterPlugin, ],
              removePlugins: ['Table', 'BlockQuote']
            }}
            data={body}          
            onChange={(event, editor) => {
              const data = editor.getData();
              onChangeBody(data);
            }}
          />
        </div>
      </div>
      <div className={classes.formInline}>
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
  );
}

export default withStyles(styles)(ChantCreateForm);
