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
  card: {
    height: 90,
    width:"51vw",
    backgroundColor: "#e5e5e5",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    ...layouts.mb8
  },
  typography: {
    textAlign: "center"
  }
});

export default withStyles(styles)(function(props) {
  const { classes } = props;
  console.log(props.marginLeft)
  return (
    <Card className={classes.card} style={{marginLeft: props.marginLeft + 'px'}}>
        <Typography variant="h6" gutterBottom className={classes.typography}>
        Yah.. Tidak ada Chant lagi :(
        </Typography>
    </Card>
  );
});
