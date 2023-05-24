import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

import Grid from "@material-ui/core/Grid";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    padding: theme.spacing.unit * 2,
    width: "100%",
  },
  recipients: {
    padding: theme.spacing.unit * 2,
    margin: theme.spacing.unit * 2,
    scrollbarWidth: "thin",
    scrollbarColor: "#ccc #f5f5f5",
    "::-webkit-scrollbar": {
      height: 0,
    },
    display: "flex",
    flexWrap: "wrap",
    maxHeight: "40vh",
    overflowY: "auto",
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
  recipient: {
    backgroundColor: "#f5f5f5",
    padding: theme.spacing.unit,
    borderRadius: theme.spacing.unit,
    margin: theme.spacing.unit * 0.5,
  },
  to: {
    alignSelf: "center",
  },
});

function EmailSendPreview({ classes, recipients, subject, body }) {
  return (
    <Paper className={classes.root} elevation={3}>
      <Grid container>
        <Grid item xs={12} sm={12}>
          <Paper className={classes.recipients}>
            <div className={classes.to}>To:</div>
            {recipients.map((email, i) => (
              <div className={classes.recipient} key={`${email}${i}`}>
                {email}
              </div>
            ))}
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
