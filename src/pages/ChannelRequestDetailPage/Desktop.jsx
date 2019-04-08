import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import { authorize } from "../../components/hocs/auth";
import { NavbarAuth, NavbarBack } from "../../components/stables/Navbar";
import { Container } from "../../components/Container";
import { Guidelines } from "../../styles";
import Particle from "../../components/Particle";

import heliosV1 from "../../modules/api/helios/v1";
import { getUserId } from "../../modules/session/selectors";
import { BulletList } from "react-content-loader";

const styles = theme => ({
  paper: {
    ...Guidelines.layouts.mt16,
    ...Guidelines.layouts.pt32,
    ...Guidelines.layouts.pr32,
    ...Guidelines.layouts.pl32,
    ...Guidelines.layouts.pb32
  },
  title: {
    ...Guidelines.fonts.medium,
    fontSize: 32
  },
  gridContainer: {
    marginTop: 64
  },
  gridLabel: {
    display: "flex",
    alignItems: "center"
  },
  label: {
    fontSize: 16,
    ...Guidelines.fonts.bold
  },
  content: {
    fontSize: 16,
    ...Guidelines.fonts.normal
  },
  gridBtn: {
    display: "flex",
    justifyContent: "flex-end"
  },
  btn: {
    ...Guidelines.layouts.mt64,
    ...Guidelines.layouts.ml24,
    width: 120
  },
  btnDelete: {
    backgroundColor: "#E24C4C"
  }
});

const STATUS = {
  RJ: "Ditolak",
  PR: "Diproses",
  AC: "Diterima"
};

class Screen extends React.Component {
  state = {
    channelRequest: null,
    loading: true
  };

  componentDidMount() {
    const { channelId } = this.props.match.params;
    heliosV1.channel
      .getChannelRequestDetail(this.props.userId, channelId)
      .then(result => {
        this.setState({ channelRequest: result.data });
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  }

  static propTypes = {
    classes: PropTypes.shape().isRequired
  };

  renderContent() {
    const { classes } = this.props;
    const {
      coverImgUrl,
      title,
      description,
      verificationStatus,
      notes
    } = this.state.channelRequest;
    return (
      <React.Fragment>
        <Typography className={classes.title} variant="h5" component="h3">
          Detail Pengajuan Channel
        </Typography>
        <Grid container spacing={24} className={classes.gridContainer}>
          <Grid item xs={3} sm={3} className={classes.gridLabel}>
            <Typography component="p" className={classes.label}>
              Gambar
            </Typography>
          </Grid>
          <Grid item xs={9} sm={9}>
            <img
              style={{
                width: 80,
                height: 80,
                objectFit: "cover"
              }}
              src={coverImgUrl}
              alt="cover channel"
            />
          </Grid>
          <Grid item xs={3} sm={3} className={classes.gridLabel}>
            <Typography component="p" className={classes.label}>
              Judul
            </Typography>
          </Grid>
          <Grid item xs={9} sm={9}>
            <Typography component="p" className={classes.content}>
              {title}
            </Typography>
          </Grid>
          <Grid item xs={3} sm={3} className={classes.gridLabel}>
            <Typography component="p" className={classes.label}>
              Deskripsi
            </Typography>
          </Grid>
          <Grid item xs={9} sm={9}>
            <Typography component="p" className={classes.content}>
              {description}
            </Typography>
          </Grid>
          <Grid item xs={3} sm={3} className={classes.gridLabel}>
            <Typography component="p" className={classes.label}>
              Status
            </Typography>
          </Grid>
          <Grid item xs={9} sm={9}>
            <Typography component="p" className={classes.content}>
              {STATUS[verificationStatus]}
            </Typography>
          </Grid>
          <Grid item xs={3} sm={3} className={classes.gridLabel}>
            <Typography component="p" className={classes.label}>
              Alasan Penolakan
            </Typography>
          </Grid>
          <Grid item xs={9} sm={9}>
            <Typography component="p" className={classes.content}>
              {notes}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} className={classes.gridBtn}>
            <Button
              className={`${classes.btn} ${classes.btnDelete}`}
              variant="contained"
            >
              Hapus
            </Button>
            <Button className={classes.btn} variant="contained" color="primary">
              Ubah
            </Button>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
  render() {
    const { classes } = this.props;
    const { loading } = this.state;

    return (
      <React.Fragment>
        <NavbarAuth />
        <NavbarBack />
        <Particle name="cloud2" left={0} top={160} />
        <Container className={classes.container}>
          <Paper className={classes.paper} elevation={1}>
            {loading ? <BulletList /> : this.renderContent()}
          </Paper>
        </Container>
      </React.Fragment>
    );
  }
}

function createContainer() {
  const mapStateToProps = state => ({
    userId: getUserId(state)
  });

  const mapDispatchToProps = dispatch => ({});

  return authorize({ mustVerified: true })(
    withRouter(
      connect(
        mapStateToProps,
        mapDispatchToProps
      )(withStyles(styles)(Screen))
    )
  );
}

export default createContainer();
