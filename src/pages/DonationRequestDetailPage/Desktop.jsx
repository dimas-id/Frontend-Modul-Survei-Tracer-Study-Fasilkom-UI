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
import { NavbarAuth, NavbarBack } from "../../components/stables/Navbar";
import { Container } from "../../components/Container";
import { Guidelines } from "../../styles";

import Particle from "../../components/Particle";
import heliosV1 from "../../modules/api/helios/v1";
import { getUser } from "../../modules/session/selectors";
import { LinesLoader } from "../../components/Loading";
import paths from "../paths";


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
    width: 120
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

class Screen extends React.Component {
  static propTypes = {
    classes: PropTypes.shape().isRequired
  };
  state = {
    bank: "0",
    DonationRequest: null,
    loading: true
  };
  componentDidMount() {
    const requestId = this.props.match.params.requestId;
    heliosV1.donation
      .getDonationProgramRequestDetail(this.props.user.id, requestId)
      .then(result => {
        console.log(result.data);
        this.setState({ DonationRequest: result.data });
      })
      .catch(error=> {
        if(error.response.status === 404){
          this.props.history.replace(paths.ERROR_404)
        }
      })
      
      .finally(() => {
        this.setState({ loading: false });
      });
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  render() {
    const { user, classes } = this.props;
    const { loading } = this.state;
    if (loading) {
      return LinesLoader;
    }
    const {
      // kategori, judul donasi, tanggal mulai, tanggal selesai, unggah proposal, status
      categoryName,
      title,
      startDate,
      endDate,
      proposalUrl,
      goalAmount,
      verificationStatus
    } = this.state.DonationRequest;

    return (
      <React.Fragment>
        <NavbarAuth />
        <NavbarBack />
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
                    {categoryName}
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
                    Proposal
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
                <Grid item xs={12} sm={12} className={classes.gridBtn}>
                  <Button
                    className={classes.btn}
                    variant="contained"
                    color="primary"
                    type="submit"
                  >
                    Ubah
                  </Button>
                  <Button
                    className={classes.btn}
                    variant="contained"
                    color="secondary"
                  >
                    Hapus
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
