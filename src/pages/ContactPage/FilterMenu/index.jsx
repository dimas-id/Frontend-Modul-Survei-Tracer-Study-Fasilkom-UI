import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import ListSubheader from "@material-ui/core/ListSubheader";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  }
});

class FilterMenu extends React.PureComponent {

 static defaultProps = {
    categories: [1]
 }
  render() {
    const { classes, onChange, categories } = this.props;

    const CATEGORIES_SELECTION = [
      {label: 'Bisa dihubungi', value: 'could_contact_me'},
      {label: 'Acara', value: 'should_send_event'},
      {label: 'Lowongan', value: 'should_send_vacancy'},
      {label: 'Newsletter', value: 'should_send_newsletter'},
      {label: 'Donasi', value: 'should_send_donation_info'},
      {label: 'Info lainnya', value: 'should_send_update'}
    ]

    return (
      <Paper className={classes.root} elevation={1}>
        <List
          dense
          subheader={<ListSubheader>Kategori Preferensi</ListSubheader>}
        >
          {CATEGORIES_SELECTION.map(category => (
            <ListItem key={category.value}>
              <ListItemText primary={category.label} />
              <ListItemSecondaryAction>
                <Checkbox
                  onChange={onChange(category.value)}
                  checked={categories.indexOf(category.value) !== -1}
                />
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Paper>
    );
  }
}

FilterMenu.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FilterMenu);
