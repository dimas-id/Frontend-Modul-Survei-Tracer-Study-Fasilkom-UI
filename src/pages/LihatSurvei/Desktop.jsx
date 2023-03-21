import React from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { authorize, ROLES } from "../../components/hocs/auth";
import {
  NavbarAuth,
  NavbarBuatKuesioner,
} from "../../components/stables/Navbar";
import { Container } from "../../components/Container";
import { Guidelines } from "../../styles";
import Particle from "../../components/Particle";
import atlasV3 from "../../modules/api/atlas/v3";
import paths from "../paths";

import { isStatusOK } from "../../libs/response";
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
              <button>Semua Survei</button>
            </div>
            <div>
              <button>Belum Dikirim</button>
            </div>
            <div>
              <button>Sudah Dikirim</button>
            </div>
          </div>
          <div>{/* Akan berisikan list dari survei */}</div>
        </Container>
      </React.Fragment>
    );
  }
}

function createContainer() {
  return authorize({
    mustVerified: true,
    roles: [ROLES.STAFF, ROLES.PUBLIC],
  })(withRouter(withStyles(styles)(Screen)));
}

export default createContainer();
