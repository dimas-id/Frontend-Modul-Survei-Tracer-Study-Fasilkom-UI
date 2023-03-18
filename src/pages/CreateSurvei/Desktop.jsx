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
import { ToastContainer} from "react-toastify";
import Toast from "../../components/Toast/index"
import "react-toastify/dist/ReactToastify.css";

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

    async function onSubmit(nama, deskripsi) {
      const response = await atlasV3.survei.postSurvei(nama, deskripsi);
      if (response.status === "success") {
        const idSurvei = response.data.survei.id;
        console.log(idSurvei);
        // panggil fungsi untuk mendaftarkan pertanyaan dan opsi jawaban
        // jika semua sudah berhasil, redirect ke /suvei dan tampilkan toast
        Toast("Survei berhasil dibuat", "success")
        setTimeout(() => {
          window.location.replace("/survei")
        }, 3500);
      } else {
        Toast(response.data, "error")
      }
    }
    return (
      <React.Fragment>
        <Particle name="cloud2" left={0} top={160} />
        <NavbarAuth title="Buat Kuesioner" />
        <NavbarBuatKuesioner onSubmit={onSubmit} />
        <Container className={classes.container}>
          <div>{/* Akan berisi komponen untuk membuat list pertanyaan */}</div>
        </Container>
        <ToastContainer />
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
