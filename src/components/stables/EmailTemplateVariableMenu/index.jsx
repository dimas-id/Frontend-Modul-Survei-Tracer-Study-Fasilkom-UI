import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  }
});

function EmailTemplateVariableMenu({ classes, onPick }) {
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
            <ListItemText primary={value} onClick={() => onPick(value)} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}

EmailTemplateVariableMenu.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EmailTemplateVariableMenu);
