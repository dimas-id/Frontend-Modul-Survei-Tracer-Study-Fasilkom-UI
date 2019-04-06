import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import { withAuth } from "../../components/hocs/auth";
import { Container } from "../../components/Container";
import { Guidelines } from "../../styles";
import TableWithPaginate from "../../components/TableWithPaginate";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Button from "@material-ui/core/Button";
import { NavbarAuth, NavbarBack } from "../../components/stables/Navbar";

const styles = theme => ({
  container: {
    ...Guidelines.layouts.flexDirRow,
    ...Guidelines.layouts.mt32,
    ...Guidelines.layouts.mr64,
    ...Guidelines.layouts.ml64
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
        namaProgram: "haha",
        tanggal: "2019-01-01",
        status: "LOL"
      },
      {
        id: 1,
        namaProgram: "haha",
        tanggal: "2019-01-01",
        status: "LOL"
      },
      {
        id: 1,
        namaProgram: "haha",
        tanggal: "2019-01-01",
        status: "LOL"
      },
      {
        id: 1,
        namaProgram: "haha",
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
        <NavbarBack title="Daftar Pengajuan Channel"/>
        <Container className={classes.container}>
          <Grid container spacing={24}>
            <Grid item xs={12} sm={12}>
              <TableWithPaginate
                columns={[
                  { name: "No." },
                  { name: "Judul Channel" },
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
                      {row.namaProgram}
                    </TableCell>
                    <TableCell align="center">{row.tanggal}</TableCell>
                    <TableCell align="center">{row.status}</TableCell>
                    <TableCell align="center">
                      <Button href="#text-buttons" className={classes.button}>
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
