import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import DeleteIcon from "@material-ui/icons/Delete";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";

import { getDateFormatted } from "../../../libs/datetime";
import { makePathVariableUri } from "../../../libs/navigation";
import paths from "../../../pages/paths";
import fixture from "../fixture.json";
import { Guidelines } from "../../../styles";

const styles = theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    position: "relative",
    overflow: "auto",
    height: "55vh",
  },
  paper: {
    ...Guidelines.layouts.flexDirCol,
    ...Guidelines.layouts.flexMiddle,
    ...Guidelines.layouts.pt32,
    ...Guidelines.layouts.pr32,
    ...Guidelines.layouts.pl32,
    ...Guidelines.layouts.pb32
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

  handleClickDelete = () => {
    window.alertDialog("Konfirmasi Penghapusan", "Apakah anda yakin menghapus templat ini?", () => {})
  };

  render() {
    const { classes } = this.props;
    const data = fixture.results;
    
    return (
      <React.Fragment>
        <Paper className={classes.paper}>
          <List className={classes.root}>
            {data.map(template => (
              <ListItem
                button
                onClick={this.handleClick}
                to={makePathVariableUri(paths.CRM_EMAIL_TEMPLATE_UPDATE, { idEmailTemplate: template.id })}
                component={Link}
              >
                <ListItemText
                  primary={template.title}
                  secondary={`Dibuat pada ${getDateFormatted(
                    template.dateCreated
                  )}`}
                />
                <ListItemSecondaryAction>
                  <IconButton aria-label="Delete" onClick={this.handleClickDelete}>
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
