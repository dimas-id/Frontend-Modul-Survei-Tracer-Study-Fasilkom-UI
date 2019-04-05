import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";

import { getDateFormatted } from "../../../libs/datetime";
import fixture from "../fixture.json";

const styles = theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    position: "relative",
    overflow: "auto",
    maxHeight: 400
  },
  paper: {
    width: "100%",
    height: "100%"
  },
  listSection: {
    backgroundColor: "inherit"
  },
  ul: {
    backgroundColor: "inherit",
    padding: 0
  }
});

class EmailTemplateList extends React.Component {
  state = {
    open: true
  };

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };

  render() {
    const { classes } = this.props;
    const data = fixture.results;

    return (
      <React.Fragment>
        <Paper className={classes.paper}>
          <List className={classes.root}>
            {data.map(template => (
              <ListItem button onClick={this.handleClick}>
                <ListItemText
                  primary={template.title}
                  secondary={`Dibuat pada ${getDateFormatted(
                    template.dateCreated
                  )}`}
                />
                <ListItemSecondaryAction>
                  <IconButton aria-label="Edit">
                    <EditIcon />
                  </IconButton>
                  <IconButton aria-label="Delete">
                    <DeleteIcon color="error" />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Paper>
      </React.Fragment>
    );
  }
}
EmailTemplateList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EmailTemplateList);
