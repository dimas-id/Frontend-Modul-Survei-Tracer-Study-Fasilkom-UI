import React from "react";

import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";

import { layouts } from "../../../styles/guidelines";

const styles = theme => ({
  media: {
    height: 140,
    ...layouts.w100
  },
  card: {
    ...layouts.pr4,
    ...layouts.pl4,
    ...layouts.pt4,
    ...layouts.pb4,
    ...layouts.ml8,
    ...layouts.flexDirCol,
    alignItems: "center",
    ...layouts.mb8,
    ...layouts.borderBox
  },
  textChannel: {
    ...layouts.w100
  }
});

export default withStyles(styles)(function(props) {
  const { classes } = props;
  return (
    <Card className={classes.card}>
                <CardMedia
                  className={classes.media}
                  image={props.coverImgUrl}
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography
                    className={classes.textChannel}
                    gutterBottom
                    variant="h5"
                    component="h2"
                  >
                    {props.title}
                  </Typography>
                  <Typography className={classes.textChannel} component="p">
                    {props.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    variant="outlined"
                    color="inherit"
                    className={classes.button}
                  >
                    Subscribe
                  </Button>
                </CardActions>
              </Card>
  );
});
