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

import "./styles.css";

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
    survei_list: null,
    survei_list_sent: null,
    survei_list_not_sent: null,
    new_state: "button1",
    loading: true,
  };

  componentDidMount() {
    this.handleLoad();
  }

  handleLoad() {
    this.setState({ loading: true }, () => {
      atlasV3.survei.getSurvei
        .then(result => {
          this.setState({ survei_list: result.data.survei });
          this.setState({ survei_list_sent: result.data.surveiDikirim });
          this.setState({
            survei_list_not_sent: result.data.surveiBelumDikirim,
          });
        })
        .finally(() => {
          this.setState({ loading: false });
        });
    });
  }

  changeState = a => {
    this.setState({ new_state: a.target.id });
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
              <button>Buat Survei Baru</button>
            </a>
          </div>
          <div className="btn-group">
            <div>
              <button
                id="button1"
                onClick={this.changeState}
                className={this.state.new_state === "button1" && "active"}
              >
                Semua Survei
              </button>
            </div>
            <div>
              <button
                id="button2"
                onClick={this.changeState}
                className={this.state.new_state === "button2" && "active"}
              >
                Belum Dikirim
              </button>
            </div>
            <div>
              <button
                id="button3"
                onClick={this.changeState}
                className={this.state.new_state === "button3" && "active"}
              >
                Sudah Dikirim
              </button>
            </div>
          </div>
          <div className="grid-container">
            {this.state.new_state === "button1" && (
              <ul id="ul1">
                {this.state.survei_list?.map(l => {
                  return (
                    <div key={`div${l.id}`}>
                      <li key={l.id} className="survei-card">
                        <div>
                          <b>{l.nama}</b>
                          {l.sudahDikirim && (
                            <div className="little-text">
                              Dikirim pada {formatDate(l.tanggalDikirim)}
                            </div>
                          )}
                          {!l.sudahDikirim && (
                            <div className="little-text">
                              Terakhir diubah pada {formatDate(l.tanggalDiedit)}
                            </div>
                          )}
                        </div>
                        {l.sudahDikirim && (
                          <div className="card-button-div">
                            <button
                              onClick={() => {
                                window.location.href = `/survei/visualisasi/${l.id}`;
                              }}
                            >
                              Statistik
                            </button>
                          </div>
                        )}
                        {!l.sudahDikirim && (
                          <div className="card-button-div">
                            <button>Ubah</button>
                            <button>Kirim</button>
                          </div>
                        )}
                      </li>
                      <br></br>
                    </div>
                  );
                })}
              </ul>
            )}
            {this.state.new_state === "button2" && (
              <ul id="ul1">
                {this.state.survei_list_not_sent?.map(l => {
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
                          <button>Ubah</button>
                          <button>Kirim</button>
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
                {this.state.survei_list_sent?.map(l => {
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
                        </div>
                      </li>
                      <br></br>
                    </div>
                  );
                })}
              </ul>
            )}
          </div>
        </Container>
      </React.Fragment>
    );
  }
}

function createContainer() {
  return authorize({
    mustVerified: true,
    roles: [ROLES.STAFF],
  })(withRouter(withStyles(styles)(Screen)));
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
