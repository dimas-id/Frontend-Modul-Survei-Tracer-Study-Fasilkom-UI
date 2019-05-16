import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import { withAuth } from "../../components/hocs/auth";
import { NavbarAuth } from "../../components/stables/Navbar";
import { Container } from "../../components/Container";
import { Guidelines } from "../../styles";
import MenuItem from "@material-ui/core/MenuItem";

import Particle from "../../components/Particle";
import { MuiPickersUtilsProvider, InlineDatePicker } from "material-ui-pickers";
import MomentUtils from "@date-io/moment";
import InputAdornment from "@material-ui/core/InputAdornment";
import FileUploadInput from "../../components/stables/FileUploadInput";
import { getUser } from "../../modules/session/selectors";

import heliosV1 from "../../modules/api/helios/v1";
import { LinesLoader } from "../../components/Loading";
import keyMirror from "keymirror";
import { getDateFormatted } from "../../libs/datetime";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContentWrapper from "../../components/stables/SnackbarContentWrapper";
import { Link } from "react-router-dom";
import paths from "../paths";
import { makePathVariableUri } from "../../libs/navigation";
import moment from "moment";
import NavbarBackDonation from "../../components/stables/Navbar/NavbarBackDonation";
import { humanizeError } from "../../libs/response";

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
  subtitle: {
    fontSize: 16,
  },
  form: {
    ...Guidelines.layouts.flexDirCol,
    marginTop: 42,
    width: 800,
  },
  gridLabel: {
    display: "flex",
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    ...Guidelines.fonts.bold,
  },
  textField: {
    width: 800,
  },
  gridBtn: {
    display: "flex",
    justifyContent: "flex-end",
  },
  btn: {
    ...Guidelines.layouts.mt64,
    width: 120,
  },
});

const categories = [
  {
    value: "XXX",
    label: "Pilih Kategori Donasi",
  },
  {
    value: "INF",
    label: "Sarana dan Infrastruktur",
  },
  {
    value: "MED",
    label: "Bantuan Medis dan Kesehatan",
  },
  {
    value: "BCN",
    label: "Bencana Alam",
  },
  {
    value: "HAD",
    label: "Hadiah dan Apresiasi",
  },
  {
    value: "SOS",
    label: "Kegiatan Sosial",
  },
  {
    value: "KEM",
    label: "Kemanusiaan",
  },
  {
    value: "LIN",
    label: "Lingkungan",
  },
  {
    value: "PTI",
    label: "Panti Asuhan",
  },
  {
    value: "RIB",
    label: "Rumah Ibadah",
  },
  {
    value: "RFC",
    label: "Run for Charity",
  },
];
const FIELDS = keyMirror({
  categoryName: null,
  title: null,
  description: null,
  startDate: null,
  endDate: null,
  goalAmount: null,
  proposalUrl: null,
});
class Screen extends React.Component {
  static propTypes = {
    classes: PropTypes.shape().isRequired,
  };

  state = {
    values: {
      [FIELDS.categoryName]: "XXX",
      [FIELDS.title]: "",
      [FIELDS.description]: "",
      [FIELDS.startDate]: moment(),
      [FIELDS.endDate]: moment(),
      [FIELDS.goalAmount]: 0,
      [FIELDS.proposalUrl]: "",
    },
    error: {
      [FIELDS.categoryName]: "",
      [FIELDS.title]: "",
      [FIELDS.description]: "",
      [FIELDS.startDate]: "",
      [FIELDS.endDate]: "",
      [FIELDS.goalAmount]: 0,
      [FIELDS.proposalUrl]: "",
    },
    donationProgram: null,
  };

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
  handleFileSubmit = ({ data, status }) => {
    if (status === 201) {
      this.setState({
        values: {
          ...this.state.values,
          [FIELDS.proposalUrl]: data.fileUrl,
        },
      });
    }
  };

  handleSubmit = e => {
    const { user, history } = this.props;
    const { values } = this.state;
    const userId = this.props.user.id;

    heliosV1.donation
      .createDonationRequest(
        userId,
        values[FIELDS.categoryName],
        values[FIELDS.title],
        values[FIELDS.description],
        getDateFormatted(values[FIELDS.startDate], "YYYY-MM-DD"),
        getDateFormatted(values[FIELDS.endDate], "YYYY-MM-DD"),
        parseFloat(values[FIELDS.goalAmount]),
        values[FIELDS.proposalUrl]
      )
      .then(() => {
        setTimeout(() => {
          history.push(
            makePathVariableUri(paths.USER_DONATION_REQUEST_LIST, {
              username: user.username,
            })
          );
          window.notifySnackbar("Pengajuan Program Donasi Berhasil Dibuat", {
            variant: "success",
          });
        }, 1000);
      })

      .catch(error => {
        if (error.response) {
          this.setState({
            error: {
              ...this.state.error,
              ...humanizeError(error.response.data, Object.keys(FIELDS)),
            },
          });
          window.notifySnackbar("Pengajuan Program Donasi Gagal Dibuat", {
            variant: "error",
          });
        }
      });
  };
  handleOpenSuccessMsg = () => {
    this.setState({ openSuccessMsg: true });
  };

  handleCloseSuccessMsg = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ openSuccessMsg: false });
  };

  handleOpenErrorMsg = msg => {
    this.setState({ openErrorMsg: msg });
  };

  handleCloseErrorMsg = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ openErrorMsg: false });
  };

  render() {
    const { user, classes } = this.props;
    const { loading, values, error } = this.state;
    if (loading) {
      return <LinesLoader />;
    }

    return (
      <React.Fragment>
        <NavbarAuth />
        <NavbarBackDonation />
        <Particle name="cloud2" left={0} top={160} />
        <Container className={classes.container}>
          <Paper className={classes.paper} elevation={1}>
            <Typography className={classes.title} variant="h5" component="h3">
              Ajukan Program Donasi
            </Typography>
            <Typography className={classes.subtitle} component="p">
              Program donasi yang Anda ajukan akan diproses oleh Admin untuk
              dibuat
            </Typography>
            <form className={classes.form}>
              <Grid container spacing={24}>
                <Grid item xs={3} sm={3} className={classes.gridLabel}>
                  <Typography component="p" className={classes.label}>
                    Pengaju Program Donasi
                  </Typography>
                </Grid>
                <Grid item xs={9} sm={9}>
                  <TextField
                    disabled
                    id="oulined-dissabled"
                    defaultValue={user.name}
                    className={classes.textField}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={3} sm={3} className={classes.gridLabel}>
                  <Typography component="p" className={classes.label}>
                    Kategori Donasi *
                  </Typography>
                </Grid>
                <Grid item xs={9} sm={9}>
                  <TextField
                    id="outlined-select-category"
                    select
                    className={classes.textField}
                    name={FIELDS.categoryName}
                    value={values[FIELDS.categoryName]}
                    onChange={this.handleChange}
                    error={Boolean(error[FIELDS.categoryName])}
                    helperText={
                      error[FIELDS.categoryName] || "masukkan kategori donasi"
                    }
                    SelectProps={{
                      MenuProps: {
                        className: classes.menu,
                      },
                    }}
                    helperText="Pilih Kategori Donasi"
                    margin="normal"
                    variant="outlined"
                  >
                    {categories.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={3} sm={3} className={classes.gridLabel}>
                  <Typography component="p" className={classes.label}>
                    Judul Donasi *
                  </Typography>
                </Grid>
                <Grid item xs={9} sm={9}>
                  <TextField
                    required
                    id="outlined-text-input"
                    className={classes.textField}
                    placeholder="Judul donasi yang diajukan"
                    name={FIELDS.title}
                    value={values[FIELDS.title]}
                    onChange={this.handleChange}
                    error={Boolean(error[FIELDS.title])}
                    helperText={
                      error[FIELDS.title] || "masukkan judul program donasi"
                    }
                    autoComplete="judul"
                    margin="normal"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={3} sm={3} className={classes.gridLabel}>
                  <Typography component="p" className={classes.label}>
                    Deskripsi *
                  </Typography>
                </Grid>
                <Grid item xs={9} sm={9}>
                  <TextField
                    required
                    id="outlined-text-input"
                    className={classes.textField}
                    placeholder="Deskripsi program donasi"
                    name={FIELDS.description}
                    value={values[FIELDS.description]}
                    onChange={this.handleChange}
                    error={Boolean(error[FIELDS.description])}
                    helperText={
                      error[FIELDS.description] ||
                      "masukkan deskripsi program donasi"
                    }
                    autoComplete="judul"
                    margin="normal"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={3} sm={3} className={classes.gridLabel}>
                  <Typography component="p" className={classes.label}>
                    Tanggal mulai *
                  </Typography>
                </Grid>
                <Grid item xs={9} sm={9}>
                  <MuiPickersUtilsProvider utils={MomentUtils}>
                    <InlineDatePicker
                      className={classes.field}
                      clearable
                      variant="outlined"
                      margin="normal"
                      format="YYYY-MM-DD"
                      error={Boolean(error[FIELDS.startDate])}
                      helperText={
                        error[FIELDS.startDate] || "masukkan tanggal mulai program donasi"
                      }
                      name={FIELDS.startDate}
                      value={values[FIELDS.startDate]}
                      onChange={this.handleDateChange(FIELDS.startDate)}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={3} sm={3} className={classes.gridLabel}>
                  <Typography component="p" className={classes.label}>
                    Tanggal selesai *
                  </Typography>
                </Grid>
                <Grid item xs={9} sm={9}>
                  <MuiPickersUtilsProvider utils={MomentUtils}>
                    <InlineDatePicker
                      className={classes.field}
                      clearable
                      variant="outlined"
                      margin="normal"
                      format="YYYY-MM-DD"
                      error={Boolean(error[FIELDS.endDate])}
                      helperText={
                        error[FIELDS.endDate] || "masukkan tanggal berakhir program donasi"
                      }
                      name={FIELDS.endDate}
                      value={values[FIELDS.endDate]}
                      onChange={this.handleDateChange(FIELDS.endDate)}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={3} sm={3} className={classes.gridLabel}>
                  <Typography component="p" className={classes.label}>
                    Target Donasi *
                  </Typography>
                </Grid>
                <Grid item xs={9} sm={9}>
                  <TextField
                    required
                    id="outlined-required"
                    label="Jumlah Donasi"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    name={FIELDS.goalAmount}
                    value={values[FIELDS.goalAmount]}
                    onChange={this.handleChange}
                    error={Boolean(error[FIELDS.goalAmount])}
                      helperText={
                        error[FIELDS.goalAmount] || "masukkan target pengumpulan program donasi"
                      }
                    type="number"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">Rp</InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={3} sm={3} className={classes.gridLabel}>
                  <Typography component="p" className={classes.label}>
                    Unggah Proposal *
                  </Typography>
                </Grid>
                <Grid item xs={9} sm={9}>
                  <FileUploadInput
                    accept="application/pdf"
                    name={FIELDS.proposalUrl}
                    value={values[FIELDS.proposalUrl]}
                    error={Boolean(error[FIELDS.proposalUrl])}
                      helperText={
                        error[FIELDS.proposalUrl] || "masukkan proposal pengajuan program donasi"
                      }
                    onChange={this.handleFileSubmit}
                  />
                </Grid>
                <Grid item xs={12} sm={12} className={classes.gridBtn}>
                  <Button
                    className={classes.btn}
                    variant="contained"
                    color="primary"
                    type="submit"
                    onClick={this.handleSubmit}
                    component={Link}
                  >
                    Simpan
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
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
            message={`Pengajuan Program Donasi Berhasil disimpan`}
          />
        </Snackbar>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          open={Boolean(this.state.openErrorMsg)}
          autoHideDuration={6000}
          onClose={this.handleCloseErrorMsg}
        >
          <SnackbarContentWrapper
            onClose={this.handleCloseErrorMsg}
            variant="error"
            message={`Pengajuan Program Donasi gagal disimpan\n${
              this.state.openErrorMsg
            }`}
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
