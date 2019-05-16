import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { withStyles } from "@material-ui/core/styles";
import { withAuth } from "../../components/hocs/auth";
import { NavbarAuth } from "../../components/stables/Navbar";
import { Container, ContainerFluid } from "../../components/Container";
import { Guidelines } from "../../styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import heliosV1 from "../../modules/api/helios/v1";
import { LinesLoader } from "../../components/Loading";
import { getUser } from "../../modules/session/selectors";
import { Link } from "react-router-dom";
import paths from "../paths";
import { makePathVariableUri } from "../../libs/navigation";
import NavbarBackDonation from "../../components/stables/Navbar/NavbarBackDonation";
import Particle from "../../components/Particle";
import { Divider } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import bni from "../../assets/BNI-logo.png";
import mandiri from "../../assets/Bank_Mandiri_logo.svg.png";

const styles = theme => ({
  paper: {
    ...Guidelines.layouts.mt32,
    ...Guidelines.layouts.pt32,
    ...Guidelines.layouts.pr64,
    ...Guidelines.layouts.pl64,
    ...Guidelines.layouts.pb32,
    ...Guidelines.layouts.flexDirCol,
    ...Guidelines.layouts.flexMiddle,
  },
  paperNominal: {
    ...Guidelines.layouts.mt32,
    ...Guidelines.layouts.mb32,
    ...Guidelines.layouts.pt8,
    ...Guidelines.layouts.w100,
    ...Guidelines.layouts.flexDirCol,
    ...Guidelines.layouts.flexMiddle,
  },
  gridPaper: {
    ...Guidelines.layouts.flexMiddle,
  },
  paymentDetail: {
    display: "flex",
    justifyContent: "flex-start",
  },
  dividerFullWidth: {
    padding: 16,
  },
  notes: {
    padding: 4,
  },
  image: {
    width: 140,
    height: "auto",
  },
  button: {
    margin: theme.spacing.unit,
  },
  s1: {
    width: "100%",
  },
  list: {
    ...Guidelines.layouts.flexDirRow,
    ...Guidelines.layouts.flexNowrap,
    ...Guidelines.layouts.flexMiddleSpaceBetween,
  },
  btn: {
    ...Guidelines.layouts.mt32,
    width: "100%",
    margin: "auto",
  },
  nameProgram: {
    ...Guidelines.fonts.bold,
  },
});
class Screen extends React.Component {
  static propTypes = {
    classes: PropTypes.shape().isRequired,
  };
  state = {
    donationTransaction: null,
    loading: true,
  };
  componentDidMount() {
    const donationId = this.props.match.params.donationId;
    heliosV1.donation
      .getUserDonationDetail(this.props.user.id, donationId)
      .then(result => {
        this.setState({ donationTransaction: result.data });
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
  bniDetector() {
    const { bankNumberDest } = this.state.donationTransaction.paymentDetail;

    return bankNumberDest === "01020203123";
  }
  mandiriDetector() {
    const { bankNumberDest } = this.state.donationTransaction.paymentDetail;

    return bankNumberDest === "3123123123";
  }

  render() {
    const { classes, user } = this.props;
    const { loading } = this.state;
    if (loading) {
      return LinesLoader;
    }
    const {
      donationProgramName,
      donationProgramEndDate,
      paymentDetail,
      amount,
      uniqueCode,
    } = this.state.donationTransaction;
    const isBni = this.bniDetector();
    const isMandiri = this.mandiriDetector();

    return (
      <ContainerFluid>
        <NavbarAuth title="Screen" />
        <NavbarBackDonation />
        <Particle name="cloud2" left={0} top={160} />
        <Particle name="cloud1" right={0} top={400} />
        <Container className={classes.container}>
          <Grid container spacing={24} className={classes.gridPaper}>
            <Paper className={classes.paper}>
              <Typography gutterBottom variant="h6" component="h2">
                Terima kasih telah berdonasi untuk
              </Typography>
              <Typography
                gutterBottom
                variant="h5"
                className={classes.nameProgram}
                component="h2"
              >
                {donationProgramName}
              </Typography>
              <Typography gutterBottom variant="h6" component="h2">
                Transfer tepat sesuai nominal berikut :
              </Typography>
              <Typography gutterBottom variant="h3" flexcomponent="h2">
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(amount)}
              </Typography>
              <Paper className={classes.paperNominal}>
                <List className={classes.s1}>
                  <li className={classes.list}>
                    <Typography
                      className={classes.dividerFullWidth}
                      gutterBottom
                      variant="h7"
                      flexcomponent="h7"
                    >
                      ID Transaksi
                    </Typography>
                    <Typography
                      className={classes.dividerFullWidth}
                      gutterBottom
                      variant="h7"
                      flexcomponent="h7"
                    >
                      {paymentDetail.paymentNumber}
                    </Typography>
                  </li>

                  <Divider component="li" />
                  <li className={classes.list}>
                    <Typography
                      className={classes.dividerFullWidth}
                      gutterBottom
                      variant="h7"
                      flexcomponent="h7"
                    >
                      Jumlah Donasi
                    </Typography>
                    <Typography
                      className={classes.dividerFullWidth}
                      gutterBottom
                      variant="h7"
                      flexcomponent="h7"
                    >
                      {" "}
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      }).format(amount - uniqueCode)}
                    </Typography>
                  </li>
                  <Divider component="li" />
                  <li className={classes.list}>
                    <Typography
                      className={classes.dividerFullWidth}
                      gutterBottom
                      variant="h7"
                      flexcomponent="h7"
                    >
                      Kode Unik *
                    </Typography>
                    <Typography
                      className={classes.dividerFullWidth}
                      gutterBottom
                      variant="h7"
                      flexcomponent="h7"
                    >
                      {uniqueCode}
                    </Typography>
                  </li>
                  <Typography
                    className={classes.notes}
                    gutterBottom
                    variant="caption"
                    color="secondary"
                  >
                    * Nominal pada kode unik akan didonasikan
                  </Typography>
                </List>
              </Paper>
              <Typography gutterBottom variant="h6" component="h2">
                Tansfer sebelum tanggal {donationProgramEndDate} ke :
              </Typography>
              <ListItem
                style={{ ...Guidelines.layouts.flexMiddle, width: "50%" }}
              >
                {isBni ? (
                  <img alt="BNI" src={bni} className={classes.image} />
                ) : null}
                {isMandiri ? (
                  <img alt="Mandiri" src={mandiri} className={classes.image} />
                ) : null}
                <ListItem />
                {paymentDetail.bankNumberDest}
                <br /> KCU Depok
              </ListItem>
              <Button
                className={classes.btn}
                variant="contained"
                color="primary"
                type="submit"
                component={Link}
                to={makePathVariableUri(paths.USER_DONATION_LIST, {
                  username: user.username,
                })}
              >
                Lihat Riwayat Donasi
              </Button>
            </Paper>
          </Grid>
        </Container>
      </ContainerFluid>
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
