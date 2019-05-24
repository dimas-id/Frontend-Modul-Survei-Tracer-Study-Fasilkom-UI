import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import classNames from "classnames";
import bundar from "../../../assets/bundar.png";
import { Link } from "react-router-dom";
import { makePathVariableUri } from "../../../libs/navigation";
import { Divider } from "@material-ui/core";
import paths from "../../../pages/paths";


const styles = theme => ({
  layout: {
    width: "auto",
  },
  cardGrid: {
    padding: theme.spacing.unit * 2,
  },
  media: {
    height: 140,
  },
  cardContent: {
    flexGrow: 1,
  },
  button: {
    margin: theme.spacing.unit,
  },
  margin: {
    margin: theme.spacing.unit,
  },
  secondary: {
    margin: theme.spacing.unit,
    marginBottom: theme.spacing.unit*2,
  },
  description: {
    margin: theme.spacing.unit,
    display: "inline-block",
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
    width: "100%",
  },
});

function Donation(props) {
  const {
    classes,
    id,
    title,
    description,
    startDate,
    endDate,
    percentageReached,
  } = props;
  

  return (
    <React.Fragment>
      <div className={classNames(classes.layout, classes.cardGrid)}>
        <Card className={classes.card}>
          <CardMedia
            className={classes.media}
            image={bundar}
            title="Donation Picture"
          />
          <CardContent>
            <Typography variant="h5" component="h2" className={classes.margin}>
              {title}
            </Typography>
            <Typography color="textSecondary" className={classes.secondary}>
              {startDate} hingga {endDate}
              <br />
              Pencapaian Target : <strong>{percentageReached} %</strong>
            </Typography>
            <Divider variant="fullWidth" />
            <Typography component="p" className={classes.description}>
              {description}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              fullWidth
              to={makePathVariableUri(paths.DONATION_FORM, {
                idProgram: id,
              })}
              className={classNames(classes.margin)}
            >
              Donasi Sekarang
            </Button>
          </CardActions>
        </Card>
      </div>
    </React.Fragment>
  );
}

Donation.propTypes = {
  classes: PropTypes.object.isRequired,
};

Donation.defaultProps = {
  title: "Program Donasi",
  description: "Yuk kita berdonasi untuk Fasilkom UI!",
  startDate: "2019/04/08",
  endDate: "2020/11/10",
};
export default withStyles(styles)(Donation);
