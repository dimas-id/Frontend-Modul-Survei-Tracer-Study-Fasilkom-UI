import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import moment from "moment";

import {withStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import CardIcon from "@material-ui/icons/CreditCardOutlined";
import Grid from "@material-ui/core/Grid";

import {withAuth} from "../../components/hocs/auth";
import {NavbarAuth} from "../../components/stables/Navbar";
import NavbarBackDonation from "../../components/stables/Navbar/NavbarBackDonation";
import {Container} from "../../components/Container";
import {Guidelines} from "../../styles";
import Particle from "../../components/Particle";
import {Typography} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import MenuItem from "@material-ui/core/MenuItem";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import MomentUtils from "@date-io/moment";
import {MuiPickersUtilsProvider, InlineDatePicker} from "material-ui-pickers";
import {getUser} from "../../modules/session/selectors";
import bundar from "../../assets/bundar.png";
import heliosV1 from "../../modules/api/helios/v1";
import {LinesLoader} from "../../components/Loading";
import keyMirror from "keymirror";
import {getDateFormatted} from "../../libs/datetime";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContentWrapper from "../../components/stables/SnackbarContentWrapper";
import {Link} from "react-router-dom";
import paths from "../paths";
import {makePathVariableUri} from "../../libs/navigation";

const styles = theme => ({
  container: {
    ...Guidelines.layouts.pr64,
    ...Guidelines.layouts.pl64,
  },
  media: {
    height: 300,
  },
  paper: {
    ...Guidelines.layouts.mt16,
  },
  paperForm: {
    ...Guidelines.layouts.mt16,
    ...Guidelines.layouts.pt32,
    ...Guidelines.layouts.pr32,
    ...Guidelines.layouts.pl32,
    ...Guidelines.layouts.pb32,
  },
  cardContent: {
    ...Guidelines.layouts.pt32,
    ...Guidelines.layouts.pr32,
    ...Guidelines.layouts.pl32,
    ...Guidelines.layouts.pb32,
  },

  form: {
    ...Guidelines.layouts.flexDirCol,
    ...Guidelines.layouts.w100,
  },
  btnProposal: {
    display: "flex",
    justifyContent: "flex-end",
    ...Guidelines.layouts.pr32,
    ...Guidelines.layouts.pl32,
    ...Guidelines.layouts.pb32,
  },
  btn: {
    ...Guidelines.layouts.mt32,
    width: "auto",
  },
});
const banks = [
  {
    value: "",
    label: "Pilih Metode Pembayaran",
  },
  {
    value: "BNI",
    label: "Transfer BNI",
  },
  {
    value: "MDR",
    label: "Transfer Mandiri",
  },
];

const FIELDS = keyMirror({
  amount: null,
  bankNumberDest: null,
  bankNumberSource: null,
  estPaymentDate: null,
});
class Screen extends React.Component {
  static propTypes = {
    classes: PropTypes.shape().isRequired,
  };

  state = {
    values: {
      [FIELDS.amount]: 0,
      [FIELDS.bankNumberDest]: "",
      [FIELDS.bankNumberSource]: "",
      [FIELDS.estPaymentDate]: moment(),
    },
    // estPaymentDate: null,
    donationProgram: null,
    loading: true,
  };

  componentDidMount() {
    const idProgram = this.props.match.params.idProgram;
    heliosV1.donation
      .getDonationProgramDetail(idProgram)
      .then(result => {
        this.setState({donationProgram: result.data});
      })
      .finally(() => {
        this.setState({loading: false});
      });
  }

  handleChange = event => {
    this.setState({
      values: {
        ...this.state.values,
        [event.target.name]: event.target.value,
      },
    });
  };

  handleDateChange = name => value => {
    this.setState(prevState => ({
      values: {
        ...prevState.values,
        [name]: value,
      },
    }));
  };

  handleSubmit = e => {
    const {history} = this.props;
    const {values} = this.state;
    const idProgram = this.props.match.params.idProgram;

    heliosV1.donation
      .createDonation(
        idProgram,
        parseFloat(values[FIELDS.amount]),
        values[FIELDS.bankNumberDest],
        values[FIELDS.bankNumberSource],
        getDateFormatted(values[FIELDS.estPaymentDate], "YYYY-MM-DD")
      )
      .then(({data}) => {
        history.push(
          makePathVariableUri(paths.DONATION_PAYMENT_DETAIL, {
            donationId: data.id,
          })
        );
        this.handleOpenSuccessMsg();
      })
      .catch(this.handleOpenErrorMsg);
  };

  handleOpenSuccessMsg = () => {
    this.setState({openSuccessMsg: true});
  };

  handleCloseSuccessMsg = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({openSuccessMsg: false});
  };

  handleOpenErrorMsg = () => {
    this.setState({openErrorMsg: true});
  };

  handleCloseErrorMsg = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({openErrorMsg: false});
  };

  render() {
    const {user, classes} = this.props;
    const {loading, values} = this.state;
    if (loading) {
      return LinesLoader;
    }

    const {title, description, proposalUrl} = this.state.donationProgram;
    return (
      <React.Fragment>
        <NavbarAuth />
        <NavbarBackDonation />
        <Particle name="cloud2" left={0} top={160} />
        <Container className={classes.container}>
          <Grid container spacing={24}>
            <Grid item sm={12} md={6}>
              <Paper className={classes.paper}>
                <CardMedia className={classes.media} image={bundar} />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {title}
                  </Typography>
                  <Typography component="p">{description}</Typography>
                </CardContent>
                <Grid item xs={12} sm={12} className={classes.btnProposal}>
                  <Button variant="outlined" color="inherit" href={proposalUrl}>
                    Lihat Proposal
                  </Button>
                </Grid>
              </Paper>
            </Grid>
            <Grid item sm={12} md={6}>
              <Paper className={classes.paperForm}>
                <div className={classes.form}>
                  <TextField
                    disabled
                    id="oulined-dissabled"
                    label="Nama"
                    defaultValue={user.name}
                    className={classes.textField}
                    variant="outlined"
                  />

                  <TextField
                    required
                    id="outlined-required"
                    label="Jumlah Donasi"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    name={FIELDS.amount}
                    value={values[FIELDS.amount]}
                    onChange={this.handleChange}
                    type="number"
                    helperText="Jumlah donasi dalam kelipatan ribuan"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">Rp</InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    id="outlined-select-bank"
                    select
                    label="Metode Pembayaran"
                    className={classes.textField}
                    name={FIELDS.bankNumberDest}
                    value={values[FIELDS.bankNumberDest]}
                    onChange={this.handleChange}
                    SelectProps={{
                      MenuProps: {
                        className: classes.menu,
                      },
                    }}
                    helperText="Pilih bank tujuan pembayaran"
                    margin="normal"
                    variant="outlined"
                  >
                    {banks.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    required
                    id="outlined-required"
                    label="Nomor Rekening Pengirim"
                    className={classes.textField}
                    name={FIELDS.bankNumberSource}
                    value={values[FIELDS.bankNumberSource]}
                    onChange={this.handleChange}
                    type="number"
                    margin="normal"
                    variant="outlined"
                    helperText="Rekening untuk validasi"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <CardIcon />
                        </InputAdornment>
                      ),
                    }}
                  />

                  <MuiPickersUtilsProvider utils={MomentUtils}>
                    <InlineDatePicker
                      className={classes.field}
                      clearable
                      name={FIELDS.estPaymentDate}
                      value={values[FIELDS.estPaymentDate]}
                      onChange={this.handleDateChange(FIELDS.estPaymentDate)}
                      variant="outlined"
                      margin="normal"
                      label="Estimasi Tanggal Pembayaran"
                      format="YYYY-MM-DD"
                    />
                  </MuiPickersUtilsProvider>
                  <Button
                    className={classes.btn}
                    variant="contained"
                    color="primary"
                    type="submit"
                    onClick={this.handleSubmit}
                    component={Link}
                  >
                    Lanjut ke Pembayaran
                  </Button>
                </div>
              </Paper>
            </Grid>
          </Grid>
        </Container>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          open={this.state.openSuccessMsg}
          autoHideDuration={6000}
          onClose={this.handleCloseSuccessMsg}
        >
          <SnackbarContentWrapper
            onClose={this.handleCloseSuccessMsg}
            variant="success"
            message={`Donasi Berhasil disimpan`}
          />
        </Snackbar>

        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          open={this.state.openErrorMsg}
          autoHideDuration={6000}
          onClose={this.handleCloseErrorMsg}
        >
          <SnackbarContentWrapper
            onClose={this.handleCloseErrorMsg}
            variant="error"
            message={`Donasi gagal disimpan`}
          />
        </Snackbar>
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
