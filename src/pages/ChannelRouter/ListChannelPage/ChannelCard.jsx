import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Star from "@material-ui/icons/Star";
import StarBorder from "@material-ui/icons/StarBorder";
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import Grid from "@material-ui/core/Grid";

import { withAuth } from "../../../components/hocs/auth";

import { Guidelines } from "../../../styles";


const styles = theme => ({
  card: {
    ...Guidelines.layouts.mb16,
    ...Guidelines.layouts.ml8,
    ...Guidelines.layouts.mr8,
    ...Guidelines.layouts.borderBox,
    height: 200
  },
  content: {
    overflow: "hidden",
    textOverflow: "ellipsis"
  },
  media: {
    height: 90,
  },
});

class Screen extends React.PureComponent {
  render() {
    const { classes } = this.props;
  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={this.props.coverImgUrl}
          title="Channel Cover"
        />
        <CardContent>
        <Grid container item xs={12} spacing={24}>
        <Grid item xs={10}>
        <Typography gutterBottom variant="h6" component="h2" className={classes.content}>
            {this.props.title}
          </Typography>
          </Grid>
          <Grid item xs={2}>
          <Typography gutterBottom variant="h6" component="h2">
          <FormControlLabel 
          control={
              <Checkbox icon={<StarBorder />} checkedIcon={<Star />} value="checkedH" />
            }
            />
           </Typography>
          </Grid>            
        </Grid>
          
        </CardContent>
      </CardActionArea>
    </Card>
  );
  }
}

function createContainer() {
  const mapStateToProps = state => ({});

  const mapDispatchToProps = dispatch => ({});

  return withAuth(
    withRouter(
      connect(
        mapStateToProps,
        mapDispatchToProps
      )(withStyles(styles)(Screen))
    )
  );
}

export default createContainer();
