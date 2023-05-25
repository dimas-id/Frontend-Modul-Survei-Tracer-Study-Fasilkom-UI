import React from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { authorize, ROLES } from "../../components/hocs/auth";
import { NavbarAuth } from "../../components/stables/Navbar";
import { Container } from "../../components/Container";
import { Guidelines } from "../../styles";
import Particle from "../../components/Particle";
import atlasV3 from "../../modules/api/atlas/v3";
import Toast from "../../components/Toast/index";
import { ToastContainer } from "react-toastify";
import SearchInput from "../../components/SearchSurvei";
import "react-toastify/dist/ReactToastify.css";

import "./styles.css";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  DialogContentText,
} from "@material-ui/core";
import { emailBlasterActions } from "../../modules/email-blaster";
import { connect } from "react-redux";

const styles = theme => ({
  container: {
    ...Guidelines.layouts.mt32,
    ...Guidelines.layouts.pr40,
    ...Guidelines.layouts.pl40,
  },
});

class Screen extends React.Component {
  static propTypes = {
    classes: PropTypes.shape().isRequired,
    location: PropTypes.object.isRequired,
  };

  state = {
    survei_list_draft: null,
    survei_list_sent: null,
    survei_list_finalized: null,
    survei_list_draft_filtered: null,
    survei_list_sent_filtered: null,
    survei_list_finalized_filtered: null,
    searchQuery: null,
    new_state: "button1",
    loading: true,
    delete_dialog: 0,
  };

  componentDidMount() {
    this.handleLoad();
  }

  handleDeleteClickOpen = surveiId => {
    this.setState({ delete_dialog: surveiId });
  };

  handleDeleteClose = () => {
    this.setState({ delete_dialog: 0 });
  };

  handleDeleteClickYa = surveiId => {
    Toast("Menghapus Survei", "info", 1000, true);
    this.setState({ loading: true });
    atlasV3.survei
      .deleteSurveiById(surveiId)
      .then(response => {
        Toast("Survei berhasil dihapus", "success");
        setTimeout(() => {
          window.location.reload();
        }, 4000);
      })
      .catch(err => {
        Toast("Survei Gagal dihapus karena error " + err.status, "error");
        setTimeout(() => {
          window.location.reload();
        }, 4000);
      });
  };

  handleEditClickOpen = surveiId => {
    this.props.history.push("/edit-survei/" + surveiId);
  };

  handleLoad() {
    this.setState({ loading: true }, () => {
      Toast("Loading Survei", "info", 1000, true);
      atlasV3.survei.getSurvei
        .then(result => {
          this.setState({ 
            survei_list_draft: result.data.surveiDraft,
            survei_list_sent: result.data.surveiDikirim,
            survei_list_finalized: result.data.surveiFinalized,
            survei_list_draft_filtered: result.data.surveiDraft,
            survei_list_sent_filtered: result.data.surveiDikirim,
            survei_list_finalized_filtered: result.data.surveiFinalized,
          });
        })
        .finally(() => {
          this.setState({ loading: false });
        });
    });
  }

  handleFilterSearch = searchQuery => {
    Toast("Mencari Survei", "info", 500, true)
    const filteredSurveiDraft = this.state.survei_list_draft.filter(
      survei => survei.nama.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1
    );
    const filteredSurveiSent = this.state.survei_list_sent.filter(
      survei => survei.nama.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1
    );
    const filteredSurveiFinalized = this.state.survei_list_finalized.filter(
      survei => survei.nama.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1
    );
    this.setState({
      searchQuery: searchQuery,
      survei_list_draft_filtered: filteredSurveiDraft,
      survei_list_sent_filtered: filteredSurveiSent,
      survei_list_finalized_filtered: filteredSurveiFinalized,
    });
  }

  changeState = a => {
    this.setState({ new_state: a.target.id });
  };

  handleSend = surveiId => {
    this.props.changeSurveiId(surveiId);
    this.props.history.push("/email-blaster/recipients");
  };

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Particle name="cloud2" left={0} top={160} />
        <NavbarAuth title="Lihat Survei" />
        <Container className={classes.container}>
          <div className="title-wrapper">
            <h1>Daftar Survei</h1>
            <a href="/buat-survei">
              <button>(+) Buat Survei Baru</button>
            </a>
          </div>
          <div className="search-wrapper">
            <SearchInput 
              valHandler={this.handleFilterSearch}
            />
          </div>
          <div className="btn-group">
            <div>
              <button
                id="button1"
                onClick={this.changeState}
                className={`${this.state.new_state === "button1" && "active"}`}
              >
                Draft
              </button>
            </div>
            <div>
              <button
                id="button2"
                onClick={this.changeState}
                className={`${this.state.new_state === "button2" && "active"}`}
              >
                Finalized
              </button>
            </div>
            <div>
              <button
                id="button3"
                onClick={this.changeState}
                className={`${this.state.new_state === "button3" && "active"}`}
              >
                Sent
              </button>
            </div>
          </div>
          <div className="grid-container">
            {this.state.searchQuery && <center>Hasil pencarian untuk <b>{this.state.searchQuery}</b></center>}
            {this.state.new_state === "button1" && (
              <ul id="ul1">
                {this.state.survei_list_draft_filtered?.map(l => {
                  return (
                    <div key={`div${l.id}`}>
                      <li key={l.id} className="survei-card">
                        <div>
                          <b>{l.nama}</b>
                          <div className="little-text">
                            Terakhir diubah pada {formatDate(l.tanggalDiedit)}
                          </div>
                        </div>

                        <div className="card-button-div">
                          <button
                            variant="contained"
                            color="secondary"
                            className={classes.button}
                            onClick={() => this.handleDeleteClickOpen(l.id)}
                          >
                            Hapus
                          </button>
                          <Dialog
                            open={this.state.delete_dialog === l.id}
                            onClose={this.handleDeleteClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                          >
                            <DialogTitle id="alert-dialog-title">
                              Yakin ingin menghapus survei "{l.nama}"?
                            </DialogTitle>
                            <DialogContent>
                              <DialogContentText id="alert-dialog-description">
                                Survei yang sudah dihapus tidak akan bisa
                                dikembalikan
                              </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                              <Button
                                onClick={this.handleDeleteClose}
                                disabled={this.state.loading}
                              >
                                Tidak
                              </Button>
                              <Button
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                onClick={() => this.handleDeleteClickYa(l.id)}
                                disabled={this.state.loading}
                                autoFocus
                              >
                                Ya, hapus saja
                              </Button>
                            </DialogActions>
                          </Dialog>
                          <button
                            variant="contained"
                            color="secondary"
                            className={classes.button}
                            onClick={() => this.handleEditClickOpen(l.id)}
                          >
                            Ubah
                          </button>
                        </div>
                      </li>
                      <br></br>
                    </div>
                  );
                })}
              </ul>
            )}
            {this.state.new_state === "button2" && (
              <ul id="ul1">
                {this.state.survei_list_finalized_filtered?.map(l => {
                  return (
                    <div key={`div${l.id}`}>
                      <li key={l.id} className="survei-card">
                        <div>
                          <b>{l.nama}</b>
                          <div className="little-text">
                            Terakhir diubah pada {formatDate(l.tanggalDiedit)}
                          </div>
                        </div>
                        <div className="card-button-div">
                          <button
                            variant="contained"
                            color="secondary"
                            className={classes.button}
                            onClick={() => this.handleDeleteClickOpen(l.id)}
                          >
                            Hapus
                          </button>
                          <Dialog
                            open={this.state.delete_dialog === l.id}
                            onClose={this.handleDeleteClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                          >
                            <DialogTitle id="alert-dialog-title">
                              Yakin ingin menghapus survei "{l.nama}"?
                            </DialogTitle>
                            <DialogContent>
                              <DialogContentText id="alert-dialog-description">
                                Survei yang sudah dihapus tidak akan bisa
                                dikembalikan
                              </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                              <Button
                                onClick={this.handleDeleteClose}
                                disabled={this.state.loading}
                              >
                                Tidak
                              </Button>
                              <Button
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                onClick={() => this.handleDeleteClickYa(l.id)}
                                disabled={this.state.loading}
                                autoFocus
                              >
                                Ya, hapus saja
                              </Button>
                            </DialogActions>
                          </Dialog>
                          <button
                            variant="contained"
                            color="secondary"
                            className={classes.button}
                            onClick={() => this.handleEditClickOpen(l.id)}
                          >
                            Ubah
                          </button>
                          <button onClick={() => this.handleSend(l.id)}>
                            Kirim
                          </button>
                        </div>
                      </li>
                      <br></br>
                    </div>
                  );
                })}
              </ul>
            )}
            {this.state.new_state === "button3" && (
              <ul id="ul1">
                {this.state.survei_list_sent_filtered?.map(l => {
                  return (
                    <div key={`div${l.id}`}>
                      <li key={l.id} className="survei-card">
                        <div>
                          <b>{l.nama}</b>
                          <div className="little-text">
                            Dikirim pada {formatDate(l.tanggalDikirim)}
                          </div>
                        </div>
                        <div className="card-button-div">
                          <button
                            onClick={() => {
                              window.location.href = `/survei/visualisasi/${l.id}`;
                            }}
                          >
                            Statistik
                          </button>
                          <button onClick={() => this.handleSend(l.id)}>
                            Kirim
                          </button>
                        </div>
                      </li>
                      <br></br>
                    </div>
                  );
                })}
              </ul>
            )}
          </div>
          <ToastContainer />
        </Container>
      </React.Fragment>
    );
  }
}

function createContainer() {
  const mapStateToProps = state => ({});

  const mapDispatchToProps = dispatch => ({
    changeSurveiId: id => dispatch(emailBlasterActions.changeSurveiId(id)),
  });

  return authorize({
    mustVerified: true,
    roles: [ROLES.STAFF],
  })(
    withRouter(
      connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Screen))
    )
  );
}

function formatDate(newDate) {
  const months = {
    1: "Januari",
    2: "Februari",
    3: "Maret",
    4: "April",
    5: "Mei",
    6: "Juni",
    7: "Juli",
    8: "Agustus",
    9: "September",
    10: "Oktober",
    11: "November",
    12: "Desember",
  };
  const d = newDate;
  const year = d.slice(0, 4);
  const date = d.slice(8, 10);
  const monthIndexStr = d.slice(5, 7);
  const monthIndex = parseInt(monthIndexStr);
  const monthName = months[monthIndex];
  const timeChanged = d.slice(11, 16);
  const formatted = `${date} ${monthName} ${year} pukul ${timeChanged}`;
  return formatted.toString();
}

export default createContainer();
