import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Guidelines } from "../../../../styles";

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import HomeCategory from "../../../../components/HomeCategory";

const styles = theme => ({
  paper: {
    ...Guidelines.layouts.flexDirCol,
    ...Guidelines.layouts.flexMiddle,
    ...Guidelines.layouts.pt32,
    ...Guidelines.layouts.pr32,
    ...Guidelines.layouts.pl32,
    ...Guidelines.layouts.pb32
  },
  gridInfo: {
    ...Guidelines.layouts.flexDirRow,
    ...Guidelines.layouts.flexMiddle
  },
  title: {
    ...Guidelines.fonts.medium,
    fontSize: 32
  },
  subtitle: {
    fontSize: 20
  },
  paperChild: {
    ...Guidelines.layouts.mt32,
    ...Guidelines.layouts.pt24,
    ...Guidelines.layouts.pr24,
    ...Guidelines.layouts.pl24,
    ...Guidelines.layouts.pb24
  },
  titleChild: {
    ...Guidelines.fonts.bold,
    fontSize: 28
  },
  subtitleChild: {
    ...Guidelines.layouts.mt16,
    fontSize: 16
  },
  button: {
    display: "flex",
    alignItems: "center"
  },
});

function CategoryPaper({ classes, title, description, imageName, path, pathUrl }) {
  let urlProps = { href: pathUrl }
  if (path) {
    urlProps = {
      to: path,
      component: Link
    }
  }

  return (
    <Paper className={classes.paperChild} elevation={1}>
      <Typography className={classes.titleChild} variant="h5" component="h3">
        {title}
      </Typography>
      <Grid container spacing={24}>
        <Grid item xs={12} sm={6}>
          <Typography className={classes.subtitleChild} component="p">
            {description}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
        <HomeCategory name={imageName}/>
        </Grid>
        <Button
          color="primary"
          className={classes.button}
          {...urlProps}
        >
          Lihat {title} >
        </Button>
      </Grid>
    </Paper>
  );
}

CategoryPaper.propTypes = {
  classes: PropTypes.shape().isRequired,
  title: PropTypes.string
};

CategoryPaper.defaultProps = {
  title: "",
  description: ""
};

export default withStyles(styles)(CategoryPaper);
