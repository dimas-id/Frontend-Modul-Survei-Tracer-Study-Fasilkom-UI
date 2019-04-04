import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

import TextField from "@material-ui/core/TextField";
import SaveIcon from "@material-ui/icons/Save";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  },
  button: {
    margin: theme.spacing.unit, 
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  iconSmall: {
    fontSize: 20
  },
  textField: {
    width: 400,
    [theme.breakpoints.down("sm")]: {
      width: "100%"
    }
  },
  rightLayout: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    display: "flex",
 }
});

class EmailTemplateForm extends React.Component {

  state = {
    title: "",
    body: "",
  };

  textInput = text => event => {
    this.setState({
      [text]: event.target.value
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.root} elevation={1}>
        <form className={classes.container} noValidate autoComplete="off">
          <TextField
            id="outlined-title"
            label="Judul Templat"
            className={classes.textField}
            value={this.state.title}
            onChange={this.textInput("title")}
            margin="normal"
            variant="outlined"
          /> 

          <TextField
            id="outlined-multiline-static"
            label="Isi Templat"
            multiline
            rows="11"
            fullWidth
            value={this.state.body}
            onChange={this.textInput("body")}
            margin="normal"
            variant="outlined"
          />
          <div className={classes.rightLayout}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
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
}

EmailTemplateForm.propTypes = {
  classes: PropTypes.object.isRequired,
};



export default withStyles(styles)(EmailTemplateForm);