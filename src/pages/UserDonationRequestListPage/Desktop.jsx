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
import { NavbarAuth } from "../../components/stables/Navbar";
import heliosV1 from "../../modules/api/helios/v1";
import { getUser } from "../../modules/session/selectors";
import { LinesLoader } from "../../components/Loading";
import { getDateFormatted } from "../../libs/datetime";
import paths from "../paths";
import { Link } from "react-router-dom";
import { makePathVariableUri } from "../../libs/navigation";
import NavbarBackDonation from "../../components/stables/Navbar/NavbarBackDonation";
import Particle from "../../components/Particle";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  paper: {
    ...Guidelines.layouts.mt16,
    ...Guidelines.layouts.pt32,
    ...Guidelines.layouts.pr32,
    ...Guidelines.layouts.pl32,
    ...Guidelines.layouts.pb32,
  },
  ditolak: {
    color: "red",
  },
  diterima: {
    color: "green",
  },
  button: {
    color: "blue",
  },
});

const STATUS = {
  RJA: "Ditolak Admin",
  PRA: "Diproses Admin",
  PRM: "Diterima Admin, diproses ke Manajemen",
  RJM: "Ditolak Manajemen, diproses Admin",
  // PRM: "Diproses Manajemen",
  ACM: "Program Donasi Diterima",
>>>>>>> 1ee29e26c1b8f3b6676e51e37d8fd06e75c4a5c6
};

class Screen extends React.Component {
  static propTypes = {
    classes: PropTypes.shape().isRequired,
  };

  state = {
    page: 0,
    rowsPerPage: 5,
    userDonationRequestList: null,
    loading: true,
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
        <NavbarBackDonation title="Daftar Permohonan Program Donasi" />
        <Particle name="cloud2" left={0} top={160} />
        <Container className={classes.container}>
          <Paper className={classes.paper} elevation={1}>
            <Typography className={classes.title} variant="h5" component="h3">
              Daftar Pengajuan Donasi
            </Typography>
            <Grid container spacing={24}>
              <Grid item xs={12} sm={12}>
                <TableWithPaginate
                  columns={[
                    { name: "No." },
                    { name: "Program Donasi" },
                    { name: "Tanggal Pengajuan" },
                    { name: "Status" },
                    { name: "Detail" },
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
                        {/* {STATUS[row.verificationStatus]} */}
                        { row.verificationStatus === 'ACM' && (
                          <Typography
                          component="p"
                          className={classes.diterima}
                        >
                          {STATUS[row.verificationStatus]}
                        </Typography>
                        )}
                        { row.verificationStatus === 'RJA' && (
                          <Typography
                          component="p"
                          className={classes.ditolak}
                        >
                          {STATUS[row.verificationStatus]}
                        </Typography>
                        )}
                        { row.verificationStatus === 'PRA' && (
                          <Typography
                          component="p"
                        >
                          {STATUS[row.verificationStatus]}
                        </Typography>
                        )}
                        { row.verificationStatus === 'PRM' && (
                          <Typography
                          component="p"
                        >
                          {STATUS[row.verificationStatus]}
                        </Typography>
                        )}
                        { row.verificationStatus === 'RJM' && (
                          <Typography
                          component="p">
                          {STATUS[row.verificationStatus]}
                        </Typography>
                        )}
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          component={Link}
                          to={makePathVariableUri(
                            paths.DONATION_REQUEST_DETAIL,
                            {
                              requestId: row.id,
                              username: user.username,
                            }
                          )}
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
          </Paper>
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
