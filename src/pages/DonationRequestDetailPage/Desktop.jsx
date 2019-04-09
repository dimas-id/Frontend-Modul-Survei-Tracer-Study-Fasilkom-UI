import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import { withAuth } from "../../components/hocs/auth";
import { NavbarAuth } from "../../components/stables/Navbar";
import NavbarBackDonation from "../../components/stables/Navbar/NavbarBackDonation";
import { Container } from "../../components/Container";
import { Guidelines } from "../../styles";

import Particle from "../../components/Particle";
import heliosV1 from "../../modules/api/helios/v1";
import { getUser } from "../../modules/session/selectors";
import { LinesLoader } from "../../components/Loading";
import paths from "../paths";
import { Link } from "react-router-dom";
import { makePathVariableUri } from "../../libs/navigation";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContentWrapper from "../../components/stables/SnackbarContentWrapper";

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
  subtitle: {
    fontSize: 16
  },
  form: {
    ...Guidelines.layouts.flexDirCol,
    marginTop: 42,
    width: 800
  },
  gridLabel: {
    display: "flex",
    alignItems: "center"
  },
  label: {
    fontSize: 16,
    ...Guidelines.fonts.bold
  },
  textField: {
    width: 800
  },
  gridBtn: {
    display: "flex",
    justifyContent: "flex-end"
  },
  btn: {
    ...Guidelines.layouts.mt64,
    width: 120,
    ...Guidelines.layouts.mr32
  },
  input: {
    display: "none"
  }
});

const STATUS = {
  RJA: "Ditolak Admin",
  PRA: "Diproses Admin",
  ACA: "Diterima Admin, Di,anjutkan ke Manajemen",
  RJM: "Ditolak Manajemen",
  PRM: "Diproses Manajemen",
  ACM: "Program Donasi Diterima"
};
const CATEGORIES = {
  XXX: "Pilih Kategori Donasi",
  INF: "Sarana dan Infrastruktur",
  MED: "Bantuan Medis dan Kesehatan",
  BCN: "Bencana Alam",
  HAD: "Hadiah dan Apresiasi",
  SOS: "Kegiatan Sosial",
  KEM: "Kemanusiaan",
  LIN: "Lingkungan",
  PTI: "Panti Asuhan",
  RIB: "Rumah Ibadah",
  RFC: "Run for Charity"
};

class Screen extends React.Component {
  static propTypes = {
    classes: PropTypes.shape().isRequired
  };
  state = {
    bank: "0",
    DonationRequest: null,
    donationProgramList: null,
    loading: true
  };
  componentDidMount() {
    const requestId = this.props.match.params.requestId;
    heliosV1.donation
      .getDonationProgramRequestDetail(this.props.user.id, requestId)
      .then(result => {
        this.setState({ DonationRequest: result.data });
      })
      .catch(error => {
        if (error.response.status === 404) {
          this.props.history.replace(paths.ERROR_404);
        }
      })

      .finally(() => {
        this.setState({ loading: false });
      });
  }
  canBeDeleted() {
    
    const { verificationStatus } = this.state.DonationRequest;
  
    return verificationStatus === "RJA";
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };
  handleClickDelete(userId, requestId) {
    const { user, history } = this.props;
    window.alertDialog(
      "Konfirmasi Penghapusan", //title
      "Apakah anda yakin menghapus pengajuan program donasi ini?",
      () => {
        heliosV1.donation
          .deleteDonationRequest(userId, requestId)
          .then(() => {
            this.setState({ loading: true });
          })
          .then(() => {
            this.handleOpenSuccessMsg();
            history.push(
              makePathVariableUri(paths.USER_DONATION_REQUEST_LIST, {
                username: user.username
              })
            );
            this.handleOpenSuccessMsg();
          })
          .catch(this.handleOpenErrorMsg);
      }
    );
  }
  handleOpenSuccessMsg = () => {
    this.setState({ openSuccessMsg: true });
  };

  handleCloseSuccessMsg = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ openSuccessMsg: false });
  };

  handleOpenErrorMsg = () => {
    this.setState({ openErrorMsg: true });
  };

  handleCloseErrorMsg = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ openErrorMsg: false });
  };

  render() {
    const { user, classes } = this.props;
    const { loading } = this.state;
    if (loading) {
      return LinesLoader;
    }
    const {
      categoryName,
      title,
      startDate,
      endDate,
      proposalUrl,
      goalAmount,
      verificationStatus,
      notes
    } = this.state.DonationRequest;
    const isEnabled = this.canBeDeleted();

    return (
      <React.Fragment>
        <NavbarAuth />
        <NavbarBackDonation />
        <Particle name="cloud2" left={0} top={160} />
        <Container className={classes.container}>
          <Paper className={classes.paper} elevation={1}>
            <Typography className={classes.title} variant="h5" component="h3">
              Detail Pengajuan Program Donasi
            </Typography>
            <form className={classes.form}>
              <Grid container spacing={24}>
                <Grid item xs={4} sm={4} className={classes.gridLabel}>
                  <Typography component="p" className={classes.label}>
                    Pengaju Program Donasi
                  </Typography>
                </Grid>
                <Grid item xs={8} sm={8}>
                  <Typography component="p" className={classes.label}>
                    {user.name}
                  </Typography>
                </Grid>
                <Grid item xs={4} sm={4} className={classes.gridLabel}>
                  <Typography component="p" className={classes.label}>
                    Kategori Donasi
                  </Typography>
                </Grid>
                <Grid item xs={8} sm={8}>
                  <Typography component="p" className={classes.label}>
                    {CATEGORIES[categoryName]}
                  </Typography>
                </Grid>
                <Grid item xs={4} sm={4} className={classes.gridLabel}>
                  <Typography component="p" className={classes.label}>
                    Judul Donasi
                  </Typography>
                </Grid>
                <Grid item xs={8} sm={8}>
                  <Typography component="p" className={classes.label}>
                    {title}
                  </Typography>
                </Grid>
                <Grid item xs={4} sm={4} className={classes.gridLabel}>
                  <Typography component="p" className={classes.label}>
                    Tanggal mulai
                  </Typography>
                </Grid>
                <Grid item xs={8} sm={8}>
                  <Typography component="p" className={classes.label}>
                    {startDate}
                  </Typography>
                </Grid>
                <Grid item xs={4} sm={4} className={classes.gridLabel}>
                  <Typography component="p" className={classes.label}>
                    Tanggal selesai
                  </Typography>
                </Grid>
                <Grid item xs={8} sm={8}>
                  <Typography component="p" className={classes.label}>
                    {endDate}
                  </Typography>
                </Grid>
                <Grid item xs={4} sm={4} className={classes.gridLabel}>
                  <Typography component="p" className={classes.label}>
                    Tautan Proposal
                  </Typography>
                </Grid>
                <Grid item xs={8} sm={8}>
                  <Typography component="p" className={classes.label}>
                    {proposalUrl}
                  </Typography>
                </Grid>
                <Grid item xs={4} sm={4} className={classes.gridLabel}>
                  <Typography component="p" className={classes.label}>
                    Target Donasi
                  </Typography>
                </Grid>
                <Grid item xs={8} sm={8}>
                  <Typography component="p" className={classes.label}>
                    Rp{goalAmount}
                  </Typography>
                </Grid>
                <Grid item xs={4} sm={4} className={classes.gridLabel}>
                  <Typography component="p" className={classes.label}>
                    Status
                  </Typography>
                </Grid>
                <Grid item xs={8} sm={8}>
                  <Typography component="p" className={classes.label}>
                    {STATUS[verificationStatus]}
                  </Typography>
                </Grid>
                {isEnabled ? (
                  <Grid item xs={4} sm={4} className={classes.gridLabel}>
                    <Typography component="p" className={classes.label}>
                      Alasan Penolakan
                    </Typography>
                  </Grid>
                ) : null}
                {isEnabled ? (
                  <Grid item xs={8} sm={8}>
                    <Typography component="p" className={classes.content}>
                      {notes}
                    </Typography>
                  </Grid>
                ) : null}
                <Grid item xs={12} sm={12} className={classes.gridBtn}>
                  <Button
                    className={classes.btn}
                    variant="contained"
                    color="primary"
                    type="submit"
                    component={Link}
                    to={makePathVariableUri(paths.DONATION_REQUEST_UPDATE, {
                      requestId: this.props.match.params.requestId,
                      username: user.username
                      
                    })}
                  >
                    Ubah
                  </Button>
                  <Button
                    className={classes.btn}
                    disabled={!isEnabled}
                    variant="contained"
                    color="error"
                    onClick={() => {
                      this.handleClickDelete(
                        user.id,
                        this.props.match.params.requestId
                      );
                    }}
                  >
                    Hapus
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Container>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={this.state.openSuccessMsg}
          autoHideDuration={6000}
          onClose={this.handleCloseSuccessMsg}
        >
          <SnackbarContentWrapper
            onClose={this.handleCloseSuccessMsg}
            variant="success"
            message={`Program Donasi Berhasil dihapus`}
          />
        </Snackbar>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={this.state.openErrorMsg}
          autoHideDuration={6000}
          onClose={this.handleCloseErrorMsg}
        >
          <SnackbarContentWrapper
            onClose={this.handleCloseErrorMsg}
            variant="error"
            message={`Program Donasi gagal dihapus`}
          />
        </Snackbar>
      </React.Fragment>
    );
  }
}

function createContainer() {
  const mapStateToProps = state => ({
    user: getUser(state)
  });

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
