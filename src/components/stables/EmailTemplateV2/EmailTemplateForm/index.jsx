import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import DeleteIcon from "@material-ui/icons/Delete";
import Grid from "@material-ui/core/Grid";

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 2,
    height: "100%",
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
  flexEnd: {
    justifyContent: "flex-end",
  },
});

function EmailTemplateForm({
  classes,
  title,
  body,
  subject,
  onChangeTitle,
  onChangeBody,
  onChangeSubject,
  onClickBody,
  onSubmit,
  onDelete,
  onDuplicate,
  onInsertVariable,
  isShow,
  errors,
}) {
  return (
    isShow && (
      <Paper elevation={1} className={classes.root}>
        <Grid container direction="column" spacing={16}>
          <form className={classes.container}>
            <Grid item>
              <TextField
                id="outlined-title"
                label="Judul Template"
                className={classes.textField}
                onChange={onChangeTitle}
                margin="normal"
                variant="outlined"
                required
                autoFocus
                value={title}
                helperText={errors[0]}
                error={errors[0] ? true : false}
              />
            </Grid>
            <Grid item>
              <TextField
                id="outlined-title"
                label="Email Subject"
                className={classes.textField}
                onChange={onChangeSubject}
                margin="normal"
                variant="outlined"
                required
                value={subject}
                helperText={errors[1]}
                error={errors[1] ? true : false}
              />
            </Grid>
            <Grid item>
              <TextField
                id="outlined-multiline-static"
                label="Email Body"
                multiline
                rows="11"
                fullWidth
                onChange={onChangeBody}
                onClick={onClickBody}
                margin="normal"
                variant="outlined"
                required
                value={body}
                helperText={errors[2]}
                error={errors[2] ? true : false}
              />
            </Grid>
            <Grid item container direction="row">
              <Grid item xs={6}>
                <Button
                  variant="outlined"
                  color="primary"
                  className={classes.button}
                  onClick={onInsertVariable}
                >
                  Insert Survei Link
                </Button>
              </Grid>
              <Grid container item xs={6} className={classes.flexEnd}>
                <Grid item xs={3}>
                  <Button
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    onClick={onDelete}
                  >
                    <DeleteIcon
                      className={classNames(
                        classes.leftIcon,
                        classes.iconSmall
                      )}
                    />
                    Delete
                  </Button>
                </Grid>
                <Grid item xs={3}>
                  <Button
                    variant="outlined"
                    color="secondary"
                    className={classes.button}
                    onClick={onDuplicate}
                  >
                    Duplicate
                  </Button>
                </Grid>
                <Grid item xs={3}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={onSubmit}
                  >
                    <SaveIcon
                      className={classNames(
                        classes.leftIcon,
                        classes.iconSmall
                      )}
                    />
                    Simpan
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Paper>
    )
  );
}

EmailTemplateForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EmailTemplateForm);
