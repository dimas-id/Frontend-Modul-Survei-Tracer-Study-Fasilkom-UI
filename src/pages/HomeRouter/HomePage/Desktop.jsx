import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import { Guidelines } from "../../../styles";
import { getUser } from "../../../modules/session/selectors";

import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Avatar, Chip } from "@material-ui/core";
import CategoryPaper from "./CategoryPaper";
import paths from "../../paths";

const styles = theme => ({
  avatar: {
    width: 120,
    height: 120
  },
  paper: {
    ...Guidelines.layouts.flexDirCol,
    ...Guidelines.layouts.flexMiddle,
    ...Guidelines.layouts.pt32,
    ...Guidelines.layouts.pr32,
    ...Guidelines.layouts.pl32,
    ...Guidelines.layouts.pb32
  },
  roleInfo: {
    ...Guidelines.layouts.flexDirRow,
    ...Guidelines.layouts.flexMiddle,
    [theme.breakpoints.down("sm")]: {
      ...Guidelines.layouts.flexDirCol
    }
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
  profilePic: {
    borderRadius: "50%",
    width: "100px",
    height: "100px"
  },
  bigAvatar: {
    margin: 10,
    width: 90,
    height: 90
  },
  chip: {
    margin: 10
  }
});
class HomePage extends React.Component {
  state = {
    open: false
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  openVerificationDialog = () => {
    window.alertDialog(
      "Verfikasi Akun",
      "Apakah anda ingin verifikasi akun anda sekarang?",
      () => {
        this.props.history.push(paths.USER_VERIFY);
      },
      () => null
    );
  };

  render() {
    const { classes, user } = this.props;
    if (!user) {
      return null;
    }

    const { profile } = user;

    return (
      <React.Fragment>
        <Paper className={classes.paper} elevation={1}>
          <Avatar
            alt="Profile Pic"
            src={profile.profilePicUrl}
            className={classes.bigAvatar}
          />
          <Typography className={classes.title} variant="h5" component="h3">
            Selamat datang, {user.firstName} 😊
          </Typography>

          <div className={classes.roleInfo}>
            {user.isVerified ? (
              <Chip
                label="Terverifikasi"
                color="primary"
                className={classes.chip}
              />
            ) : (
              <Chip
                label="Belum Terverifikasi"
                color="secondary"
                variant="outlined"
                className={classes.chip}
              />
            )}
            {user.isStaff || user.isSuperUser ? (
              <Chip
                label={`Admin (${user.groups.join(",")})`}
                color="default"
                className={classes.chip}
              />
            ) : (
              ""
            )}
            {!user.isVerified && (
              <Button
                color="primary"
                className={classes.button}
                onClick={this.openVerificationDialog}
              >
                Verifikasi Sekarang
              </Button>
            )}
          </div>

          <Grid container spacing={24}>
            <Grid item xs={12} md={6}>
              <CategoryPaper
                title="Donasi"
                description="Sarana untuk menyalurkan salah satu bentuk kepedulian sosial Anda"
                imageName="cloudDonation"
                path={paths.DONASI}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CategoryPaper
                title="Channel"
                description="Sarana bertukar informasi antar pengguna yang disajikan dengan berbagai kategori"
                imageName="cloudChannel"
                path={paths.CHANNEL}
              />
            </Grid>

            {(user.isStaff || user.isSuperUser) && (
              <React.Fragment>
                <Grid item xs={12} md={6}>
                  <CategoryPaper
                    title="Dashboard"
                    description="Sarana untuk mengetahui perkembangan ILUNI12 sekarang"
                    imageName="cloudDashboard"
                    pathUrl="http://localhost:3000/"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CategoryPaper
                    title="Email Blaster"
                    description="Sarana untuk mengirimkan email secara personal ke pengguna"
                    imageName="cloudEmail"
                    path={paths.CRM_MAILER}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CategoryPaper
                    title="Daftar Kontrak Pengguna"
                    description="Sarana untuk melihat semua kontak pengguna"
                    imageName="cloudContact"
                    path={paths.CRM_CONTACT}
                  />
                </Grid>
              </React.Fragment>
            )}
          </Grid>
        </Paper>
      </React.Fragment>
    );
  }
}

function createContainer() {
  const mapStateToProps = state => ({
    user: getUser(state)
  });

  const mapDispatchToProps = dispatch => ({});

  return withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(withStyles(styles)(HomePage))
  );
}

export default createContainer();
