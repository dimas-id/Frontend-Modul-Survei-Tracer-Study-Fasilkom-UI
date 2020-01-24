import React from "react";

import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { Guidelines } from "../../styles";

const styles = theme => ({
  card: {
    ...Guidelines.layouts.mb8,
    ...Guidelines.layouts.borderBox,
  },
});

export default withStyles(styles)(function(props) {
  const { classes } = props;
  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar
            alt={props.title}
            src={props.profilePicUrl}
            className={classes.avatar}
          />
        }
        title={<Typography variant="h6">{props.title}</Typography>}
        subheader={props.numberOfChants + " Chants"}
      />
    </Card>
  );
});
