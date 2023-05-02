import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

import Grid from "@material-ui/core/Grid";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  recipients: {
    padding: theme.spacing.unit * 2,
    margin: theme.spacing.unit * 2,
    whiteSpace: "nowrap",
    overflowX: "auto",
    scrollbarWidth: "thin",
    scrollbarColor: "#ccc #f5f5f5",
    "::-webkit-scrollbar": {
      height: 0,
    },
  },
  subject: {
    padding: theme.spacing.unit * 2,
    margin: theme.spacing.unit * 2,
    whiteSpace: "nowrap",
    overflowX: "auto",
    scrollbarWidth: "thin",
    scrollbarColor: "#ccc #f5f5f5",
    "::-webkit-scrollbar": {
      height: 0,
    },
  },
  body: {
    padding: theme.spacing.unit * 2,
    margin: theme.spacing.unit * 2,
    minHeight: "20vh",
    whiteSpace: "pre-wrap",
  },
});

function EmailSendPreview({ classes, recipients, subject, body }) {
  return (
    <Paper className={classes.root} elevation={3}>
      <Grid container>
        <Grid item xs={12} sm={12}>
          <Paper className={classes.recipients}>
            To: {recipients.join(", ")}
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Paper className={classes.subject}>{subject}</Paper>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Paper className={classes.body}>{body}</Paper>
        </Grid>
      </Grid>
    </Paper>
  );
}

EmailSendPreview.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EmailSendPreview);
