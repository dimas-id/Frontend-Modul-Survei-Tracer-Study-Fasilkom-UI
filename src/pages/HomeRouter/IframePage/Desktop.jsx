import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Guidelines } from "../../../styles";
import JotformEmbed from 'react-jotform-embed';
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { loadEducations } from "../../../modules/experience/thunks";
import { getEducations } from "../../../modules/experience/selectors";
import {
  getUser,
  getUserAccessToken
} from "../../../modules/session/selectors";
import amber from "@material-ui/core/colors/amber";
import paths from "../../paths";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { JOTFORM_ID_CANDIDATES_VOTING_FORM } from "../../../config";

const styles = () => ({
  paper: {
    ...Guidelines.layouts.pt32,
    ...Guidelines.layouts.pr32,
    ...Guidelines.layouts.pl32,
    ...Guidelines.layouts.pb32
  },
  title: {
    ...Guidelines.layouts.flexMiddle,
    ...Guidelines.fonts.medium,
    fontSize: 32
  },
  subtitle: {
    ...Guidelines.layouts.flexMiddle,
    ...Guidelines.layouts.mb48,
    fontSize: 20
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

class IframePage extends React.Component {

  componentDidMount() {
    if (this.props.user.id) {
      this.props.load(this.props.user)
    }
  }

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

  
render() {
  const { classes, user, userAccessToken, educations } = this.props;
  if (educations && user && user.isVerified) {
    const URL = `${JOTFORM_ID_CANDIDATES_VOTING_FORM}?email=${user.email}&name=${user.name}&npm=${educations[0].uiSsoNpm}&token=${userAccessToken}`
    return (
      <React.Fragment>
          <Typography className={classes.title} variant="h5" component="h3">
            Voting Bakal Calon Ketua Iluni12
          </Typography>      

      <JotformEmbed src={URL} /> 
      </React.Fragment> 
  );
  }
  return (
      <React.Fragment>
            {!user.isVerified && (
              <Grid item xs={12}>
                <div className={classes.verifyContainer}>
                  <Typography
                    variant="body1"
                    style={{ flexGrow: 1, marginBottom: 12 }}
                  >
                    Anda belum terverifikasi. Pastikan data diri anda lengkap di halaman {" "}
                    <Link to={paths.USER_PROFILE}>Info Pribadi</Link>. Lakukan verifikasi
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
        </React.Fragment>
  );
}
}

function createContainer() {
  const mapStateToProps = state => ({
    educations: getEducations(state),
    user: getUser(state),
    userAccessToken: getUserAccessToken(state)
  });

  const mapDispatchToProps = dispatch => ({
    load: user => dispatch(loadEducations(user.id)),
  });

  return connect(
    mapStateToProps,
    mapDispatchToProps
    )(withStyles(styles)(IframePage));
}

export default createContainer();



