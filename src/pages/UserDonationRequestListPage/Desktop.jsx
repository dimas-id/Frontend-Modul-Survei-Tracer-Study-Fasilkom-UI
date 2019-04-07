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
import heliosV1 from "../../modules/api/helios/v1";
import { getUser } from "../../modules/session/selectors";
import { LinesLoader } from "../../components/Loading";
import { getDateFormatted } from "../../libs/datetime";
import paths from "../paths";
import { Link } from "react-router-dom";
import { makePathVariableUri } from "../../libs/navigation";

const styles = theme => ({
  container: {
    ...Guidelines.layouts.flexDirRow,
    ...Guidelines.layouts.mt32,
    ...Guidelines.layouts.mr64,
    ...Guidelines.layouts.ml64
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
    page: 0,
    rowsPerPage: 5,
    userDonationRequestList: null,
    loading: true
  };
  componentDidMount() {
    heliosV1.donation
      .getUserDonationRequestList(this.props.user.id)
      .then(result => {
        this.setState({ userDonationRequestList: result.data.results });
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ page: 0, rowsPerPage: event.target.value });
  };

  render() {
    const { userDonationRequestList, page, rowsPerPage, loading } = this.state;
    if (loading) {
      return LinesLoader;
    }
    const { user, classes } = this.props;
    return (
      <React.Fragment>
        <NavbarAuth />
        <NavbarBack title="Daftar Permohonan Program Donasi" />
        <Container className={classes.container}>
          <Grid container spacing={24}>
            <Grid item xs={12} sm={12}>
              <TableWithPaginate
                columns={[
                  { name: "No." },
                  { name: "Program Donasi" },
                  { name: "Tanggal Pengajuan" },
                  { name: "Status" },
                  { name: "Detail" }
                ]}
                rows={userDonationRequestList}
                page={page}
                rowsPerPage={rowsPerPage}
                renderRow={(row, index) => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row" align="center">
                      {index + 1}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.title}
                    </TableCell>
                    <TableCell align="center">
                      {getDateFormatted(row.dateCreated, "DD MMMM YYYY")}
                    </TableCell>
                    <TableCell align="center">
                      {STATUS[row.verificationStatus]}
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        component={Link}
                      to={makePathVariableUri(paths.DONATION_REQUEST_DETAIL , {
                        requestId: row.id,  username: user.username
                      })}
                        className={classes.button}

                      >
                        Lihat
                      </Button>
                    </TableCell>
                  </TableRow>
                )}
              />
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
