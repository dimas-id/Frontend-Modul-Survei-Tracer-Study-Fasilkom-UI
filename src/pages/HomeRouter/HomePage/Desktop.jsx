import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Link } from "react-router-dom"
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
import amber from "@material-ui/core/colors/amber";

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
    ...Guidelines.layouts.mb24,
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
    flexGrow: 1,
    flex: 1,
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
  verifyContainer: {
    backgroundColor: amber[100],
    flex: 1,
    ...Guidelines.layouts.flexMiddleSpaceBetween,
    flexWrap: "wrap",
    ...Guidelines.layouts.pt16,
    ...Guidelines.layouts.pr24,
    ...Guidelines.layouts.pl24,
    ...Guidelines.layouts.pb16,
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

  openVerificationDialog = isUserDataComplete => {
    const title = !isUserDataComplete ? "Lengkapi Akun" : "Verifikasi Akun";
    const description = !isUserDataComplete
      ? "Apakah anda ingin lengkapi akun anda sekarang?"
      : "Apakah anda ingin verifikasi akun anda sekarang?";
    window.alertDialog(
      title,
      description,
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
    if (!user || !user.profile) {
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
                label={
                  !user.isComplete
                    ? "Belum Lengkap ❌"
                    : "Belum Terverifikasi ❌"
                }
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
          </div>

          <Grid container spacing={12}>
            {!user.isCompleted && (
              <Grid item xs={12} style={{ marginBottom: 12 }}>
                <div className={classes.verifyContainer}>
                  <Typography
                    variant="body1"
                    style={{ flexGrow: 1, marginBottom: 12 }}
                  >
                    Data diri Anda belum lengkap. Lakukan verifikasi segera dan
                    lengkapi data di halaman <Link to={paths.USER_PROFILE}>Info Pribadi</Link>.
                  </Typography>
                </div>
              </Grid>
            )}
            {!user.isVerified && (
              <Grid item xs={12}>
                <div className={classes.verifyContainer}>
                  <Typography
                    variant="body1"
                    style={{ flexGrow: 1, marginBottom: 12 }}
                  >
                    Verifikasi sedang berjalan di belakang. Lakukan verifikasi
                    ulang jika sistem gagal melakukan verifikasi setelah jangka
                    waktu tertentu status Anda tidak berubah. Klik "Verifikasi
                    Sekarang" untuk memulai verifikasi ulang.
                  </Typography>
                  <Button
                    color="primary"
                    className={classes.button}
                    onClick={this.openVerificationDialog}
                  >
                    Verifikasi Sekarang
                  </Button>
                </div>
              </Grid>
            )}
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
                      pathUrl={`${config.ATLAS}/id/__admin__/`}
                    />
                  </Grid>
                )}
                {this.isHeliosAdmin() && (
                  <Grid item xs={12} md={6}>
                    <CategoryPaper
                      title="Administrasi Helios"
                      description="Sarana untuk melakukan administrasi channel dan donasi"
                      imageName="cloudHelios"
                      pathUrl={`${config.HELIOS}/id/__admin__/`}
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

    if (!user) {
      return null;
    }

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
