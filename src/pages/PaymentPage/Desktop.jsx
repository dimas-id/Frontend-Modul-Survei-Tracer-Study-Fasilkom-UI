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

const styles = theme => ({
  paper: {
    ...Guidelines.layouts.mt32,
    ...Guidelines.layouts.pt32,
    ...Guidelines.layouts.pr64,
    ...Guidelines.layouts.pl64,
    ...Guidelines.layouts.pb32,
    ...Guidelines.layouts.flexDirCol,
    ...Guidelines.layouts.flexMiddle
  },
  paperNominal: {
    ...Guidelines.layouts.mt32,
    ...Guidelines.layouts.mb32,
    ...Guidelines.layouts.pt8,
    ...Guidelines.layouts.pb32,
    ...Guidelines.layouts.w100,
    ...Guidelines.layouts.flexDirCol,
    ...Guidelines.layouts.flexMiddle
  },
  gridPaper: {
    ...Guidelines.layouts.flexMiddle
  },
  paymentDetail: {
    display : "flex",
    justifyContent : "flex-start"
  }
});

class Screen extends React.PureComponent {
  static propTypes = {
    classes: PropTypes.shape().isRequired
  };

  render() {
    const { classes } = this.props;
    return (
      <ContainerFluid>
        <NavbarAuth title="Screen" />
        <Container className={classes.container}>
          <Grid container spacing={24} className={classes.gridPaper}>
            <Grid item xs={6} sm={6}>
              <Paper className={classes.paper}>
                <Typography gutterBottom variant="h5" component="h2">
                  Terima kasih telah berdonasi
                </Typography>
                <Typography gutterBottom variant="h5" component="h2">
                  Transfer tepat sesuai nominal berikut :
                </Typography>
                <Paper className={classes.paperNominal}> 
                  <Typography gutterBottom variant="h5" flexcomponent="h2">
                    Rp 100.401
                  </Typography>
                  <Grid item xs={12} sm={12} className={classes.paymentDetail}>
                  <Typography gutterBottom variant="h7" flexcomponent="h7">
                    ID Transaksi : 
                  </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} className={classes.paymentDetail}>

                  <Typography gutterBottom variant="h7" flexcomponent="h7">
                    Jumlah Donasi : 
                  </Typography>
                  </Grid>

                  <Grid item xs={12} sm={12} className={classes.paymentDetail}>

                  <Typography gutterBottom variant="h7" flexcomponent="h7">
                    Kode Unik : 
                  </Typography>
                  </Grid>

                  
                </Paper>
                <Typography gutterBottom variant="h5" component="h2">
                  Tansfer ke :
                </Typography>
                <Typography component="p">
                  BCA
                </Typography>
                <Button
                  className={classes.btn}
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  Lihat Riwayat Donasi
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </ContainerFluid>
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
