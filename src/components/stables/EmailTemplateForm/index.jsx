import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import {withStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

import TextField from "@material-ui/core/TextField";
import SaveIcon from "@material-ui/icons/Save";
import Button from "@material-ui/core/Button";
import {Grid} from "@material-ui/core";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  button: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },
  textField: {
    width: "100%",
  },
  rightLayout: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    display: "flex",
  },
});

function EmailTemplateForm({
  classes,
  title,
  body,
  subject,
  description,
  onChangeTitle,
  onChangeBody,
  onChangeSubject,
  onChangeDescription,
  onSubmit,
  setBodyRef,
}) {
  return (
    <Paper className={classes.root} elevation={1}>
      <form className={classes.container}>
        <Grid container>
          <Grid item xs={12} sm={12}>
            <TextField
              id="outlined-title"
              label="Judul Templat"
              className={classes.textField}
              onChange={onChangeTitle}
              margin="normal"
              variant="outlined"
              value={title}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              id="outlined-title"
              label="Subjek Templat"
              className={classes.textField}
              onChange={onChangeSubject}
              margin="normal"
              variant="outlined"
              value={subject}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              id="outlined-title"
              label="Deskripsi Templat"
              className={classes.textField}
              onChange={onChangeDescription}
              margin="normal"
              variant="outlined"
              value={description}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              inputRef={setBodyRef}
              id="outlined-multiline-static"
              label="Isi Templat"
              multiline
              rows="11"
              fullWidth
              onChange={onChangeBody}
              margin="normal"
              variant="outlined"
              value={body}
            />
          </Grid>
        </Grid>

        <div className={classes.rightLayout}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={onSubmit}
          >
            <SaveIcon
              className={classNames(classes.leftIcon, classes.iconSmall)}
            />
            Simpan
          </Button>
        </div>
      </form>
    </Paper>
  );
}

EmailTemplateForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EmailTemplateForm);
