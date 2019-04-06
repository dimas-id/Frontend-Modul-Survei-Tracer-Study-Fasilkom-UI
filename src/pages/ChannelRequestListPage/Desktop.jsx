import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import { withStyles } from "@material-ui/core/styles";
import { NavbarAuth, NavbarBack } from "../../components/stables/Navbar";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import { withAuth } from "../../components/hocs/auth";
import { Container } from "../../components/Container";
import { Guidelines } from "../../styles";
import Particle from "../../components/Particle";
import TableWithPaginate from "../../components/TableWithPaginate";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";


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
  }
});

class Screen extends React.Component {
  static propTypes = {
    classes: PropTypes.shape().isRequired
  };

  state = {
    rows: [
      {
        id: 1,
        title: "haha",
        description: "Channel ini berisi manusia yang menyukai data dan science",
        tanggal: "2019-01-01",
        status: "LOL"
      },
      {
        id: 1,
        title: "haha",
        description: "Channel ini berisi manusia yang menyukai data dan science",
        tanggal: "2019-01-01",
        status: "LOL"
      },
      {
        id: 1,
        title: "haha",
        description: "Channel ini berisi manusia yang menyukai data dan science",
        tanggal: "2019-01-01",
        status: "LOL"
      },
      {
        id: 1,
        title: "haha",
        description: "Channel ini berisi manusia yang menyukai data dan science",
        tanggal: "2019-01-01",
        status: "LOL"
      },
      {
        id: 1,
        title: "haha",
        description: "Channel ini berisi manusia yang menyukai data dan science",
        tanggal: "2019-01-01",
        status: "LOL"
      }
      
    ],
    page: 0,
    rowsPerPage: 5
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ page: 0, rowsPerPage: event.target.value });
  };

  render() {
    const { classes } = this.props;
    const { rows, page, rowsPerPage } = this.state;
    return (
      <React.Fragment>
        <NavbarAuth />
        <NavbarBack />
        <Particle name="cloud2" left={0} top={160} />
        <Container className={classes.container}>
          <Paper className={classes.paper} elevation={1}>
            <Typography className={classes.title} variant="h5" component="h3">
              Daftar Pengajuan Channel
            </Typography>
            <Grid container spacing={24}>
              <Grid item xs={12} sm={12}>
                <TableWithPaginate
                  columns={[
                    { name: "No." },
                    { name: "Judul Channel" },
                    { name: "Deskripsi" },
                    { name: "Tanggal Pengajuan" },
                    { name: "Status" },
                    { name: "Detail" }
                  ]}
                  renderRow={(row, index) => (
                    <TableRow key={row.id}>
                      <TableCell component="th" scope="row" align="center">
                        {index + 1}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row.title}
                      </TableCell>
                      <TableCell align="center">{row.description}</TableCell>
                      <TableCell align="center">{row.tanggal}</TableCell>
                      <TableCell align="center">{row.status}</TableCell>
                      <TableCell align="center">
                        <Button href="" color="primary" className={classes.button}>
                          Lihat
                        </Button>
                      </TableCell>
                    </TableRow>
                  )}
                  rows={rows}
                  page={page}
                  rowsPerPage={rowsPerPage}
                />
              </Grid>
            </Grid>
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
