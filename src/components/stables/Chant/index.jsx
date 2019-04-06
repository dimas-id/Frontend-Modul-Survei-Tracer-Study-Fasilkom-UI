import React from "react";
import { Link } from "react-router-dom";

import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ShareIcon from '@material-ui/icons/Share';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";

import { Guidelines } from "../../../styles";
import { makePathVariableUri } from "../../../libs/navigation";
import paths from "../../../pages/paths";


const styles = theme => ({
  card: {
    ...Guidelines.layouts.pr24,
    ...Guidelines.layouts.pl24,
    ...Guidelines.layouts.pt24,
    ...Guidelines.layouts.pb24,
    width : "48vw"
  },
  chantWrapper: {
    textOverflow: "ellipsis"
  },
  actions: {
      display: "flex",
      ...Guidelines.layouts.flexDirCol,
      alignItems: "flex-start"
  }
});

export default withStyles(styles)(function(props) {
  const { classes } = props;
  const  margin = props.margin;
  const overflow = props.overflow;
  const max = props.max;

  console.log("id" + props.id);

  console.log(overflow)
  console.log(margin)
  return (
    <Card className={classes.card} style={{ marginLeft: props.margin + 'px' }} >
      <CardHeader
        avatar={
          <Avatar aria-label="Recipe" className={classes.avatar}>
            R
          </Avatar>
        }
        action={
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        }
        title="Shrimp and Chorizo Paella"
        subheader={props.dateCreated}
      />
      <CardContent>
        <Typography variant="title" gutterBottom>
          {props.title}
        </Typography>
        <div className={classes.chantWrapper} style={{overflow: overflow, maxHeight: max, maxLine: max}}>
          <Typography variant="body2" gutterBottom>
            {props.body}
          </Typography>
        </div>
      </CardContent>
      <CardActions className={classes.actions} disableActionSpacing>
        <Link to={makePathVariableUri(paths.CHANNEL_CHANT_DETAIL, {
                      channelId: props.channel, chantId: props.id
                    })}>Lihat Detail... </Link>
        <div>
        <FormControlLabel
          control={
            <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} value="checkedH" />
          }
          label={props.numberLikes}
        />
          <IconButton aria-label="Share">
            <ShareIcon />
          </IconButton>
          </div>
        </CardActions>
    </Card>
  );
});
