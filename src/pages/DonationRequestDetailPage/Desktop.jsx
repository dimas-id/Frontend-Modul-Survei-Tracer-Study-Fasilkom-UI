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

const styles = theme => ({
  paper: {
    ...Guidelines.layouts.mt16,
    ...Guidelines.layouts.pt32,
    ...Guidelines.layouts.pr32,
    ...Guidelines.layouts.pl32,
    ...Guidelines.layouts.pb32,
  },
  title: {
    ...Guidelines.fonts.medium,
    fontSize: 32,
  },
  gridContainer: {
    marginTop: 32,
  },
  gridLabel: {
    display: "flex",
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    ...Guidelines.fonts.bold,
  },
  gridBtn: {
    display: "flex",
    justifyContent: "flex-end",
  },
  btn: {
    ...Guidelines.layouts.mt64,
    width: 120,
    ...Guidelines.layouts.mr16,
  },
  btnDelete: {
    ...Guidelines.layouts.mt64,
    width: 120,
    ...Guidelines.layouts.mr16,
    backgroundColor: "#E24C4C",
  },
});

const STATUS = {
  RJA: "Ditolak Admin",
  PRA: "Diproses Admin",
  ACA: "Diterima Admin, Dilanjutkan ke Manajemen",
  RJM: "Ditolak Manajemen",
  PRM: "Diproses Manajemen",
  ACM: "Program Donasi Diterima",
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
  RFC: "Run for Charity",
};

class Screen extends React.Component {
  static propTypes = {
    classes: PropTypes.shape().isRequired,
  };
  state = {
    bank: "0",
    DonationRequest: null,
    donationProgramList: null,
    loading: true,
  };
  componentDidMount() {
    const requestId = this.props.match.params.requestId;
    heliosV1.donation
      .getDonationProgramRequestDetail(this.props.user.id, requestId)
      .then(result => {
        this.setState({ DonationRequest: result.data });
      })
      .catch(error => {
        if (error.response && error.response.status === 404) {
          this.props.history.replace(paths.ERROR_404);
        }
      })

      .finally(() => {
        this.setState({ loading: false });
      });
  }
  canBeDeletedandUpdated() {
    const { verificationStatus } = this.state.DonationRequest;

    return verificationStatus === "RJA";
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
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
            window.notifySnackbar("Request Donasi berhasil dihapus", {
              variant: "success",
            });
            history.push(
              makePathVariableUri(paths.USER_DONATION_REQUEST_LIST, {
                username: user.username,
              })
            );
            // this.handleOpenSuccessMsg();
          })
          .catch(() => {
            window.notifySnackbar("Request Donasi tidak dapat dihapus", {
              variant: "warning",
            });
          });
      },
      () => null
    );
  }

  render() {
    const { user, classes } = this.props;
    const { loading } = this.state;
    if (loading) {
      return LinesLoader;
    }
    const {
      title,
      startDate,
      endDate,
      proposalUrl,
      goalAmount,
      verificationStatus,
      notes,
      categoryName,
    } = this.state.DonationRequest;
    const isEnabled = this.canBeDeletedandUpdated();
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
              <Grid container spacing={24} className={classes.gridContainer}>
                <Grid item xs={4} sm={4} className={classes.gridLabel}>
                  <Typography component="p" className={classes.label}>
                    Pengaju Program Donasi
                  </Typography>
                </Grid>
                <Grid item xs={8} sm={8}>
                  <Typography component="p">{user.name}</Typography>
                </Grid>
                <Grid item xs={4} sm={4} className={classes.gridLabel}>
                  <Typography component="p" className={classes.label}>
                    Kategori Donasi
                  </Typography>
                </Grid>
                <Grid item xs={8} sm={8}>
                  <Typography component="p">
                    {CATEGORIES[categoryName]}
                  </Typography>
                </Grid>
                <Grid item xs={4} sm={4} className={classes.gridLabel}>
                  <Typography component="p" className={classes.label}>
                    Judul Donasi
                  </Typography>
                </Grid>
                <Grid item xs={8} sm={8}>
                  <Typography component="p">{title}</Typography>
                </Grid>
                <Grid item xs={4} sm={4} className={classes.gridLabel}>
                  <Typography component="p" className={classes.label}>
                    Tanggal mulai
                  </Typography>
                </Grid>
                <Grid item xs={8} sm={8}>
                  <Typography component="p">{startDate}</Typography>
                </Grid>
                <Grid item xs={4} sm={4} className={classes.gridLabel}>
                  <Typography component="p" className={classes.label}>
                    Tanggal selesai
                  </Typography>
                </Grid>
                <Grid item xs={8} sm={8}>
                  <Typography component="p">{endDate}</Typography>
                </Grid>
                <Grid item xs={4} sm={4} className={classes.gridLabel}>
                  <Typography component="p" className={classes.label}>
                    Tautan Proposal
                  </Typography>
                </Grid>
                <Grid item xs={8} sm={8}>
                  <Typography component="p">
                    <a href={proposalUrl} className={classes.link}>
                      {proposalUrl}
                    </a>
                  </Typography>
                </Grid>
                <Grid item xs={4} sm={4} className={classes.gridLabel}>
                  <Typography component="p" className={classes.label}>
                    Target Donasi
                  </Typography>
                </Grid>
                <Grid item xs={8} sm={8}>
                  <Typography component="p">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(goalAmount)}
                  </Typography>
                </Grid>
                <Grid item xs={4} sm={4} className={classes.gridLabel}>
                  <Typography component="p" className={classes.label}>
                    Status
                  </Typography>
                </Grid>
                <Grid item xs={8} sm={8}>
                  <Typography component="p">
                    {STATUS[verificationStatus]}
                  </Typography>
                </Grid>
                {Boolean(notes) ? (
                  <Grid item xs={4} sm={4} className={classes.gridLabel}>
                    <Typography component="p" className={classes.label}>
                      Catatan Khusus
                    </Typography>
                  </Grid>
                ) : null}
                {Boolean(notes) ? (
                  <Grid item xs={8} sm={8}>
                    <Typography component="p" className={classes.content}>
                      {notes}
                    </Typography>
                  </Grid>
                ) : null}
                <Grid item xs={12} sm={12} className={classes.gridBtn}>
                  <Button
                    className={classes.btnDelete}
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
                  <Button
                    className={classes.btn}
                    disabled={!isEnabled}
                    variant="contained"
                    color="primary"
                    type="submit"
                    component={Link}
                    to={makePathVariableUri(paths.DONATION_REQUEST_UPDATE, {
                      requestId: this.props.match.params.requestId,
                      username: user.username,
                    })}
                  >
                    Ubah
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Container>
      </React.Fragment>
    );
  }
}

function createContainer() {
  const mapStateToProps = state => ({
    user: getUser(state),
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
