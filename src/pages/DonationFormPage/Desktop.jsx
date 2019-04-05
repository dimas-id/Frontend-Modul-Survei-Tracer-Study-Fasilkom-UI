import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

import Grid from "@material-ui/core/Grid";

import { withAuth } from "../../components/hocs/auth";
import { NavbarAuth, NavbarBack } from "../../components/stables/Navbar";
import { Container } from "../../components/Container";
import { Guidelines } from "../../styles";
import Particle from "../../components/Particle";
import { Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import MenuItem from "@material-ui/core/MenuItem";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider, InlineDatePicker } from "material-ui-pickers";
import { getUser } from "../../modules/session/selectors";
import bundar from "../../assets/bundar.png"


const styles = theme => ({
  container: {
    ...Guidelines.layouts.pr64,
    ...Guidelines.layouts.pl64
  },
  media: {
    height: 300
  },
  paper: {
    ...Guidelines.layouts.mt16, 
  },
  paperForm: {
    ...Guidelines.layouts.mt16,
    ...Guidelines.layouts.pt32,
    ...Guidelines.layouts.pr32,
    ...Guidelines.layouts.pl32,
    ...Guidelines.layouts.pb32
  },
  cardContent: {
    ...Guidelines.layouts.pt32,
    ...Guidelines.layouts.pr32,
    ...Guidelines.layouts.pl32,
    ...Guidelines.layouts.pb32

  },

  form: {
    ...Guidelines.layouts.flexDirCol,
    ...Guidelines.layouts.w100
  },
  btnProposal: {
    display: "flex",
    justifyContent: "flex-end",
    ...Guidelines.layouts.pr32,
    ...Guidelines.layouts.pl32,
    ...Guidelines.layouts.pb32
  },
  btn: {
    ...Guidelines.layouts.mt32,
    width: "auto"
  }
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
    bank: "0",
    estPaymentDate: null
    
  };
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };
  // handleChange = event =>{
  //   this.setState({ [event.target.name] : event.target.value});
  // }

  render() {
    const { user, classes } = this.props;
    const { estPaymentDate } = this.state;
    
    return (
      <React.Fragment>
        <NavbarAuth />
        <NavbarBack />
        <Particle name="cloud2" left={0} top={160} />
        <Container className={classes.container}>
          <Grid container spacing={24}>
            <Grid item xs={6} sm={6}>
              <Paper className={classes.paper}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={bundar}
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Donasi A
                    </Typography>
                    <Typography component="p">
                      ini adalah donasi untuk A
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <Grid item xs={12} sm={12} className={classes.btnProposal}>
                  <Button variant="outlined" color="inherit">
                    Lihat Proposal
                  </Button>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={6} sm={6}>
              <Paper className={classes.paperForm}>
                <form className={classes.form}>
                  <TextField
                    disabled
                    id="oulined-dissabled"
                    label="Nama"
                    defaultValue={user.name}
                    className={classes.textField}
                    variant="outlined"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                        checkedIcon={<CheckBoxIcon fontSize="small" />}
                        value="checkedI"
                      />
                    }
                    label="Sembunyikan nama saya (Anonim)"
                  />
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
                  <TextField
                    id="outlined-select-bank"
                    select
                    label="Metode Pembayaran"
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
                  <TextField
                    required
                    id="outlined-required"
                    label="Nomor Rekening Pengirim"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    helperText="Rekening untuk validasi"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start"></InputAdornment>
                      )
                    }}
                  />

                  <MuiPickersUtilsProvider utils={MomentUtils}>
                    <InlineDatePicker
                      className={classes.field}
                      clearable
                      name="estPaymentDate"
                      value={estPaymentDate}
                      variant="outlined"
                      margin="normal"
                      label="Estimasi Tanggal Pembayaran"
                      format="YYYY-MM-DD"
                      onChange={(date)=> this.setState({estPaymentDate : date})}
                    />
                  </MuiPickersUtilsProvider>
                  <Button
                    className={classes.btn}
                    variant="contained"
                    color="primary"
                    type="submit"
                  >
                    Lanjut ke Pembayaran
                  </Button>
                </form>
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
