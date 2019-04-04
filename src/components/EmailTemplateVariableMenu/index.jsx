import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import AddCircle from "@material-ui/icons/AddCircle";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  }
});

class EmailTemplateVariableMenu extends React.Component {
  state = {
    variableText: "",
  };

  buttonHandle = text => event => {
    this.setState({
      [text]: event.target.value
    });
  };

  render() {
    const { classes } = this.props;
    console.log(this.state.variableText)

    return (
      <Paper className={classes.root} elevation={1}>
        <List dense subheader={<ListSubheader>Daftar Variabel</ListSubheader>}>
          {[
            "{{ first_name }}",
            "{{ last_name }}",
            "{{ latest_csui_program }}",
            "{{ latest_csui_class_year }}",
            "{{ email }}"
          ].map(value => (
            <ListItem key={value} button>
              <ListItemText primary={value} />
              <ListItemSecondaryAction>
                <IconButton aria-label="Plus-Circle"  onClick={() => this.props.onSubmit(value)}>
                  <AddCircle />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Paper>
    );
  }
}

EmailTemplateVariableMenu.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EmailTemplateVariableMenu);
