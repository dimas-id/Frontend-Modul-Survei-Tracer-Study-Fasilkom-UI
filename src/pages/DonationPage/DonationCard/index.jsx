import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import classNames from "classnames";
import Grid from "@material-ui/core/Grid";
import CssBaseline from "@material-ui/core/CssBaseline";
import paths from "../../paths";
import { Link } from "react-router-dom";
import { makePathVariableUri } from "../../../libs/navigation";

const styles = theme => ({
  layout: {
    width: "auto",
    marginLeft: theme.spacing.unit * 6,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.down(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`
  },

  card: {
    maxWidth: 300,
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  media: {
    height: 140
  },
  cardContent: {
    flexGrow: 1
  },
  button: {
    margin: theme.spacing.unit
  },
  margin: {
    margin: theme.spacing.unit
  },
  bootstrapRoot: {
    boxShadow: "none",
    textTransform: "none",
    fontSize: 16,
    fontColor: "#ffffff",
    padding: "6px 12px",
    border: "1px solid",
    lineHeight: 1.5,
    backgroundColor: "#00C7E5",
    borderColor: "#00C7E5",
    "&:hover": {
      backgroundColor: "#0069d9",
      borderColor: "#0062cc"
    },
    "&:active": {
      boxShadow: "none",
      backgroundColor: "#0062cc",
      borderColor: "#005cbf"
    },
    "&:focus": {
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)"
    }
  }
});

function Donation(props) {
  const { classes, id, title, description } = props;
  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        <div className={classNames(classes.layout, classes.cardGrid)}>
          <Grid container spacing={24} style={{ padding: 24 }}>
            <Grid item md={12}>
              <Card className={classes.card}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image="/static/images/cards/contemplative-reptile.jpg"
                    title="Contemplative Reptile"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {title}
                    </Typography>
                    <Typography component="p">{description}</Typography>
                    
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    fullWidth
                    to={makePathVariableUri(paths.DONATION_FORM, {
                      idProgram: id
                    })}
                    className={classNames(
                      classes.margin,
                      classes.bootstrapRoot
                    )}
                  >
                    Donasi Sekarang
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </div>
      </main>
    </React.Fragment>
  );
}

Donation.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Donation);
