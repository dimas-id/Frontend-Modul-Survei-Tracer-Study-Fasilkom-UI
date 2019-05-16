import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import moment from "moment";

import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import CardIcon from "@material-ui/icons/CreditCardOutlined";
import Grid from "@material-ui/core/Grid";

import { withAuth } from "../../components/hocs/auth";
import { NavbarAuth } from "../../components/stables/Navbar";
import NavbarBackDonation from "../../components/stables/Navbar/NavbarBackDonation";
import { Container } from "../../components/Container";
import { Guidelines } from "../../styles";
import Particle from "../../components/Particle";
import { Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import MenuItem from "@material-ui/core/MenuItem";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider, InlineDatePicker } from "material-ui-pickers";
import { getUser } from "../../modules/session/selectors";
import bundar from "../../assets/bundar.png";
import heliosV1 from "../../modules/api/helios/v1";
import { LinesLoader } from "../../components/Loading";
import keyMirror from "keymirror";
import { getDateFormatted } from "../../libs/datetime";
import { Link } from "react-router-dom";
import paths from "../paths";
import { makePathVariableUri } from "../../libs/navigation";
import NumberFormat from "react-number-format";
import { humanizeError } from "../../libs/response";
import { Divider } from "@material-ui/core";

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
  margin: {
    margin: theme.spacing.unit * 2,
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
function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            name: other.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator="."
      decimalSeparator=","
    />
  );
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};
class Screen extends React.Component {
  static propTypes = {
    classes: PropTypes.shape().isRequired,
  };

  state = {
    values: {
      [FIELDS.amount]: "0",
      [FIELDS.bankNumberDest]: "",
      [FIELDS.bankNumberSource]: "",
      [FIELDS.estPaymentDate]: moment(),
    },
    error: {
      [FIELDS.amount]: "",
      [FIELDS.bankNumberDest]: "",
      [FIELDS.bankNumberSource]: "",
      [FIELDS.estPaymentDate]: "",
    },
    donationProgram: null,
    loading: true,
  };

  componentDidMount() {
    const idProgram = this.props.match.params.idProgram;
    heliosV1.donation
      .getDonationProgramDetail(idProgram)
      .then(result => {
        this.setState({ donationProgram: result.data });
      })
      .finally(() => {
        this.setState({ loading: false });
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
    const { history } = this.props;
    const { values } = this.state;
    const idProgram = this.props.match.params.idProgram;

    heliosV1.donation
      .createDonation(
        idProgram,
        parseFloat(values[FIELDS.amount]),
        values[FIELDS.bankNumberDest],
        values[FIELDS.bankNumberSource],
        getDateFormatted(values[FIELDS.estPaymentDate], "YYYY-MM-DD")
      )
      .then(({ data }) => {
        history.push(
          makePathVariableUri(paths.DONATION_PAYMENT_DETAIL, {
            donationId: data.id,
          })
        );
        window.notifySnackbar("Donasi berhasil dibuat", {
          variant: "success",
        });
      })
      .catch(error => {
        if (error.response) {
          this.setState({
            error: {
              ...this.state.error,
              ...humanizeError(error.response.data, Object.keys(FIELDS)),
            },
          });
          window.notifySnackbar("Gagal membuat donasi", {
            variant: "error",
          });
        }
      });
  };

  render() {
    const { user, classes } = this.props;
    const { loading, values, error } = this.state;
    if (loading) {
      return LinesLoader;
    }
    const {
      title,
      description,
      proposalUrl,
      startDate,
      endDate,
      percentageReached,
    } = this.state.donationProgram;
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
                  <Typography
                    variant="h5"
                    component="h2"
                    className={classes.margin}
                  >
                    Anda akan berdonasi untuk {title}
                  </Typography>
                  <Typography component="p" className={classes.margin}>
                    {description}
                  </Typography>
                  <Divider variant="fullWidth" />
                  <Typography color="textSecondary" className={classes.margin}>
                    Estimasi tanggal pembayaran :{" "}
                    {getDateFormatted(startDate, "DD MMMM YYYY")} hingga{" "}
                    {getDateFormatted(endDate, "DD MMMM YYYY")}
                    <br />
                    Target tercapai : <strong>{percentageReached} %</strong>
                  </Typography>
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
                    id="formatted-numberformat-input"
                    label="Jumlah Donasi"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    name={FIELDS.amount}
                    value={values[FIELDS.amount]}
                    onChange={this.handleChange}
                    error={Boolean(error[FIELDS.amount])}
                    helperText={
                      error[FIELDS.amount] || "Masukkan jumlah pembayaran"
                    }
                    InputProps={{
                      inputComponent: NumberFormatCustom,
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
                    error={Boolean(error[FIELDS.bankNumberDest])}
                    helperText={
                      error[FIELDS.bankNumberDest] ||
                      "Pilih bank tujuan pembayaran"
                    }
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
                    error={Boolean(error[FIELDS.bankNumberSource])}
                    helperText={
                      error[FIELDS.bankNumberSource] ||
                      "Masukkan nomor rekening pengirim untuk validasi"
                    }
                    margin="normal"
                    variant="outlined"
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
                      error={Boolean(error[FIELDS.estPaymentDate])}
                      helperText={
                        error[FIELDS.estPaymentDate] ||
                        "Masukkan tanggal estimasi pembayaran"
                      }
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
