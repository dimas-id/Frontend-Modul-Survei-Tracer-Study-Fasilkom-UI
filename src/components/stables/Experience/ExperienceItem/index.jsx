import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import { withStyles } from "@material-ui/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/EditOutlined";

import { LinesLoader } from "../../../Loading";

import { Guidelines } from "../../../../styles";

const styles = {
  experience: {
    ...Guidelines.layouts.pt16,
    ...Guidelines.layouts.pb16,
    ...Guidelines.layouts.pr16,
    ...Guidelines.layouts.pl16,
  },
  title: {
    ...Guidelines.fonts.bold,
  },
  text: {
    fontSize: 20,
    whiteSpace: "pre-line",
  },
  btnContainer: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-end",
  },
};

function ExperienceItem({
  classes,
  title,
  subtitle,
  time,
  onClick,
  loading,
}) {
  return (
    <Paper className={classes.experience} elevation={1}>
      <Grid container spacing={24}>
        {loading && (
          <Grid item xs={12}>
            <LinesLoader height={24} />
          </Grid>
        )}
        {!loading && (
          <React.Fragment>
            <Grid item xs={11}>
              <Typography className={classNames(classes.text, classes.title)}>
                {title}
              </Typography>
              <Typography className={classes.text}>{subtitle}</Typography>
              <Typography className={classes.text}>{time}</Typography>
            </Grid>
            {onClick && (
              <Grid item xs={1} className={classes.btnContainer}>
                <IconButton onClick={onClick}>
                  <EditIcon />
                </IconButton>
              </Grid>
            )}
          </React.Fragment>
        )}
      </Grid>
    </Paper>
  );
}

ExperienceItem.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ExperienceItem);
