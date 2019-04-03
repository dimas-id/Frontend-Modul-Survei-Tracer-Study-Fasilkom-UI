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
import { NavbarAuth, NavbarBack } from "../../components/stables/Navbar";
import { Container } from "../../components/Container";
import { Guidelines } from "../../styles";
import MenuItem from "@material-ui/core/MenuItem";

import Particle from "../../components/Particle";
import { MuiPickersUtilsProvider, InlineDatePicker } from "material-ui-pickers";
import MomentUtils from "@date-io/moment";
import InputAdornment from "@material-ui/core/InputAdornment";

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
    display: 'none',
  },
});
const banks = [
  {
    value: "0",
    label: "Pilih Metode Pembayaran"
  },
  {
    value: "1",
    label: "Transfer BNI"
  },
  {
    value: "2",
    label: "Transfer Mandiri"
  },
  {
    value: "3",
    label: "Transfer BCA"
  }
];
class Screen extends React.PureComponent {
  static propTypes = {
    classes: PropTypes.shape().isRequired
  };
  state = {
    bank: "0"
  };
  
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <NavbarAuth />
        <NavbarBack />
        <Particle name="cloud2" left={0} top={160} />
        <Container className={classes.container}>
          <Paper className={classes.paper} elevation={1}>
            <Typography className={classes.title} variant="h5" component="h3">
              Ajukan Sebuah Channel
            </Typography>
            <Typography className={classes.subtitle} component="p">
              Channel yang Anda ajukan akan diproses oleh Admin untuk dibuat
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
                    defaultValue="Nama Orang"
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
                    id="outlined-select-bank"
                    select
                    className={classes.textField}
                    value={this.state.bank}
                    onChange={this.handleChange("bank")}
                    SelectProps={{
                      MenuProps: {
                        className: classes.menu
                      }
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
                </Grid>
                <Grid item xs={3} sm={3} className={classes.gridLabel}>
                  <Typography component="p" className={classes.label}>
                    Judul Donasi *
                  </Typography>
                </Grid>
                <Grid item xs={9} sm={9}>
                  <TextField
                    id="outlined-text-input"
                    className={classes.textField}
                    placeholder="Judul Channel yang diajukan"
                    type="text"
                    name="judul"
                    autoComplete="judul"
                    margin="normal"
                    variant="outlined"
                    required
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
                      onChange={() => null}
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
                      onChange={() => null}
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
                    helperText="Jumlah donasi dalam kelipatan ribuan"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">Rp</InputAdornment>
                      )
                    }}
                  />
                </Grid>
                <Grid item xs={3} sm={3} className={classes.gridLabel}>
                  <Typography component="p" className={classes.label}>
                    Unggah Proposal *
                  </Typography>
                </Grid>
                <Grid item xs={9} sm={9}>
                  <input
                    accept="image/*"
                    className={classes.input}
                    id="outlined-button-file"
                    multiple
                    type="file"
                  />
                  <label htmlFor="outlined-button-file">
                    <Button
                      variant="outlined"
                      component="span"
                      className={classes.button}
                    >
                      Upload
                    </Button>
                  </label>
                </Grid>
                <Grid item xs={12} sm={12} className={classes.gridBtn}>
                  <Button
                    className={classes.btn}
                    variant="contained"
                    color="primary"
                    type="submit"
                  >
                    Simpan
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
  const mapStateToProps = state => ({});

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
