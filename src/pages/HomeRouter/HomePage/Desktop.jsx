import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import { Guidelines } from "../../../styles";
import { GROUPS } from "../../../modules/session";
import {
  getUser,
  selectCurrentUserGroups,
} from "../../../modules/session/selectors";
import { updateUserProfile } from "../../../modules/session/thunks";

import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import CameraEnhanceIcon from "@material-ui/icons/CameraEnhanceOutlined";
import { Avatar, Chip } from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

import FormDialog from "../../../components/FormDialog";
import CategoryPaper from "./CategoryPaper";
import config from "../../../config";
import paths from "../../paths";
import FileUploadInput from "../../../components/stables/FileUploadInput";
import { METABASE_URL } from "../../../config/index.js";

const styles = theme => ({
  avatar: {
    width: 120,
    height: 120,
  },
  paper: {
    ...Guidelines.layouts.flexDirCol,
    ...Guidelines.layouts.flexMiddle,
    ...Guidelines.layouts.pt32,
    ...Guidelines.layouts.pr32,
    ...Guidelines.layouts.pl32,
    ...Guidelines.layouts.pb32,
  },
  roleInfo: {
    ...Guidelines.layouts.flexDirRow,
    ...Guidelines.layouts.flexMiddle,
    [theme.breakpoints.down("sm")]: {
      ...Guidelines.layouts.flexDirCol,
    },
  },
  title: {
    ...Guidelines.fonts.medium,
    fontSize: 32,
  },
  subtitle: {
    fontSize: 20,
  },
  button: {
    display: "flex",
    alignItems: "center",
  },
  photo: {
    ...Guidelines.layouts.flexDirRow,
    ...Guidelines.layouts.flexMiddle,
    position: "relative",
    [theme.breakpoints.down("sm")]: {
      ...Guidelines.layouts.flexDirCol,
      ...Guidelines.layouts.mb16,
    },
  },
  bigAvatar: {
    margin: 10,
    width: 90,
    height: 90,
  },
  buttonUpload: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#00C7E5",
  },
  helperText: {
    ...Guidelines.layouts.mt8,
    fontSize: 12,
  },
  chip: {
    margin: 10,
  },
});

class HomePage extends React.Component {
  state = {
    openUpload: false,
    profilePicUrl: "",
  };

  handleProfilePicUrl({ data, status }) {
    if (status === 201) {
      this.setState({
        profilePicUrl: data.fileUrl,
      });
    }
  }

  handleOpenUpload = () => {
    this.setState({ openUpload: true });
  };

  handleCloseUpload = () => {
    this.setState({ openUpload: false });
  };

  handleSubmit = () => {
    const { updatePhoto } = this.props;
    const { profilePicUrl } = this.state;

    this.setState({ profilePicUrl: "" });
    updatePhoto(profilePicUrl).then(() => {
      this.handleCloseUpload();
    });
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

  isHeliosAdmin() {
    const { groups, user } = this.props;
    return (
      user.isSuperuser ||
      groups.findIndex(
        g =>
          g === GROUPS.ADMIN_CHANNEL ||
          g === GROUPS.ADMIN_DONATION ||
          g === GROUPS.MANAGEMENT
      ) > -1
    );
  }

  isAtlasAdmin() {
    const { groups, user } = this.props;
    return (
      user.isSuperuser || groups.findIndex(g => g === GROUPS.ADMIN_USER) > -1
    );
  }

  renderBody() {
    const { classes, user } = this.props;
    if (!user) {
      return null;
    }

    const { profile } = user;

    return (
      <React.Fragment>
        <Paper className={classes.paper} elevation={1}>
          <div className={classes.photo}>
            <Avatar
              src={profile.profilePicUrl}
              alt="Profile Pic"
              className={classes.bigAvatar}
            />
            <IconButton
              className={classes.buttonUpload}
              onClick={this.handleOpenUpload}
            >
              <CameraEnhanceIcon />
            </IconButton>
          </div>
          <Typography className={classes.title} variant="h5" component="h3">
            Selamat datang, {user.firstName} 😊
          </Typography>

          <div className={classes.roleInfo}>
            {user.isVerified ? (
              <Chip
                label="Terverifikasi ✔"
                color="primary"
                className={classes.chip}
              />
            ) : (
              <Chip
                label="Belum Terverifikasi ❌"
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
                    pathUrl={METABASE_URL}
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
                    title="Daftar Kontak Pengguna"
                    description="Sarana untuk melihat semua kontak pengguna"
                    imageName="cloudContact"
                    path={paths.CRM_CONTACT}
                  />
                </Grid>
                {this.isAtlasAdmin() && (
                  <Grid item xs={12} md={6}>
                    <CategoryPaper
                      title="Administrasi Atlas"
                      description="Sarana untuk melakukan administrasi data alumni dan pengguna"
                      imageName="cloudAtlas"
                      pathUrl={`${config.ATLAS}/__admin__/`}
                    />
                  </Grid>
                )}
                {this.isHeliosAdmin() && (
                  <Grid item xs={12} md={6}>
                    <CategoryPaper
                      title="Administrasi Helios"
                      description="Sarana untuk melakukan administrasi channel dan donasi"
                      imageName="cloudHelios"
                      pathUrl={`${config.HELIOS}/__admin__/`}
                    />
                  </Grid>
                )}
              </React.Fragment>
            )}
          </Grid>
        </Paper>
      </React.Fragment>
    );
  }

  render() {
    const { classes, user } = this.props;
    const { profile } = user;
    return (
      <React.Fragment>
        <FormDialog
          title="Ubah Foto Profil"
          open={this.state.openUpload}
          onClose={this.handleCloseUpload}
        >
          <DialogContent>
            <FileUploadInput
              accept="image/*"
              onChange={this.handleProfilePicUrl.bind(this)}
              value={profile.profilePicUrl}
            />
            <Typography className={classes.helperText} variant="p">
              Upload file dengan format .jpg, .jpeg, atau .png
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              onClick={this.handleSubmit}
              disabled={!Boolean(this.state.profilePicUrl)}
            >
              Simpan
            </Button>
          </DialogActions>
        </FormDialog>
        {this.renderBody()}
      </React.Fragment>
    );
  }
}

function createContainer() {
  const mapStateToProps = state => ({
    user: getUser(state),
    groups: selectCurrentUserGroups(state),
  });

  const mapDispatchToProps = dispatch => ({
    updatePhoto: profilePicUrl =>
      dispatch(updateUserProfile({ profilePicUrl })),
  });

  return withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(withStyles(styles)(HomePage))
  );
}

export default createContainer();
