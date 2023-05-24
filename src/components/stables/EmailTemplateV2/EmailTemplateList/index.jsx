import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import AddIcon from "@material-ui/icons/Add";
const styles = theme => ({
  root: {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  listItem: {
    marginBottom: theme.spacing.unit * 3,
    whiteSpace: "nowrap",
    width: "100%",
    "&:hover": {
      cursor: "pointer",
      boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
    },
  },
  listTextContainer: {
    paddingLeft: theme.spacing.unit,
    overflowX: "auto",
    overflowY: "hidden",
    "-moz-user-select": "none",
    "-webkit-user-select": "none",
    "-ms-user-select": "none",
    "user-select": "none",
    scrollbarWidth: "thin",
    scrollbarColor: "#ccc #f5f5f5",
    "::-webkit-scrollbar": {
      height: 0,
    },
  },
  smallText: {
    margin: 0,
    padding: "0 0 0.5rem 0",
    fontSize: "0.7rem",
  },
});

function EmailTemplateList({ classes, templates, onClickTemplate, handleNew }) {
  return (
    <Grid container direction="column" className={classes.root}>
      {Object.keys(templates).map((key, i) => (
        <Grid item key={key} className={classes.listItem}>
          <Paper
            className={classes.listTextContainer}
            elevation={2}
            onClick={e => onClickTemplate(e, key)}
          >
            <h5> {templates[key].title} </h5>
            {!templates[key].isSaved && (
              <p style={{ color: "red" }} className={classes.smallText}>
                * Unsaved Changes
              </p>
            )}
          </Paper>
        </Grid>
      ))}
      <Grid item className={classes.listItem}>
        <Paper
          className={classes.listTextContainer}
          elevation={2}
          onClick={handleNew}
        >
          <Grid container direction="row" alignItems="center">
            <Grid item>
              <AddIcon />
            </Grid>
            <Grid item>
              <h5>Add New Template</h5>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}

EmailTemplateList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EmailTemplateList);
