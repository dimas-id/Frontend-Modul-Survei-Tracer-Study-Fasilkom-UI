import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Link } from "react-router-dom"

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
import { getDateFormatted } from "../../libs/datetime";

import heliosV1 from "../../modules/api/helios/v1";
import { getUserId } from "../../modules/session/selectors";
import { LoadingFill } from "../../components/Loading";
import { makePathVariableUri } from "../../libs/navigation";
import paths from "../../pages/paths";

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

const STATUS = {
  RJ: "Ditolak",
  PR: "Diproses",
  AC: "Diterima"
};
class Screen extends React.Component {
  state = {
    channelRequestList: null,
    loading: true,
    page: 0,
    rowsPerPage: 5
  };

  componentDidMount() {
    heliosV1.channel
      .getChannelRequestList(this.props.userId)
      .then(result => {
        this.setState({ channelRequestList: result.data.results });
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  }

  static propTypes = {
    classes: PropTypes.shape().isRequired
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ page: 0, rowsPerPage: event.target.value });
  };

  renderContent() {
    const { classes } = this.props;
    const { channelRequestList, page, rowsPerPage } = this.state;

    return (
      <React.Fragment>
        <TableWithPaginate
          columns={[
            { name: "No." },
            { name: "Judul Channel" },
            { name: "Deskripsi" },
            { name: "Tanggal Pengajuan" },
            { name: "Status" },
            { name: "Detail" }
          ]}
          rows={channelRequestList}
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
              <TableCell align="center">{row.description}</TableCell>
              <TableCell align="center">
                {getDateFormatted(row.dateCreated, "DD MMMM YYYY")}
              </TableCell>
              <TableCell align="center">
                {STATUS[row.verificationStatus]}
              </TableCell>
              <TableCell align="center">
                <Button
                  component={Link}
                  to={makePathVariableUri(paths.CHANNEL_REQUEST_DETAIL, {
                    channelId: row.id
                  })}
                  color="primary"
                  className={classes.button}
                >
                  Lihat
                </Button>
              </TableCell>
            </TableRow>
          )}
        />
      </React.Fragment>
    );
  }
  render() {
    const { classes } = this.props;
    const { loading } = this.state;
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
                {loading ? <LoadingFill /> : this.renderContent()}
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
    userId: getUserId(state)
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
