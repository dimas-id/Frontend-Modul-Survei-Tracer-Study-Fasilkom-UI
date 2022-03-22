import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { authorize, ROLES } from "../../components/hocs/auth";
import { NavbarAuth, NavbarBack } from "../../components/stables/Navbar";
import { Container } from "../../components/Container";
import { Guidelines } from "../../styles";
import Particle from "../../components/Particle";
import FilterAlumniMenu from "./FilterAlumniMenu";
import AlumniList from "./AlumniList";

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
  };

  state = {
    nama: "",
    gender: "",
    domisili: "",
    angkatan: "",
    gelar: "",
    posisi: "",
    industri: "",
    perusahaan: "",
    triggerSearch: false,
  };

  handleChange = ({ target }) => {
    switch (target.id || target.name) {
      case "nama":
        this.setState({
          nama: target.value,
        });
        break;

      case "gender":
        this.setState({
          gender: target.value,
        });
        break;

      case "domisili":
        this.setState({
          domisili: target.value,
        });
        break;

      case "angkatan":
        const re = /^[0-9]+$/;
        if (target.value === "" || re.test(target.value)) {
          this.setState({
            angkatan: target.value,
          });
        }
        break;

      case "gelar":
        this.setState({
          gelar: target.value,
        });
        break;

      case "posisi":
        this.setState({
          posisi: target.value,
        });
        break;

      case "industri":
        this.setState({
          industri: target.value,
        });
        break;

      case "perusahaan":
        this.setState({
          perusahaan: target.value,
        });
        break;

      default:
    }
  };

  handleSearch = () => {
    this.setState({
      triggerSearch: !this.state.triggerSearch,
    });
  };

  render() {
    const { classes } = this.props;
    const {
      nama,
      gender,
      domisili,
      angkatan,
      gelar,
      posisi,
      industri,
      perusahaan,
    } = this.state;

    return (
      <React.Fragment>
        <NavbarAuth title="Pencarian Alumni" />
        <NavbarBack />
        <Particle name="cloud2" left={0} top={160} />

        <Container className={classes.container}>
          <Grid container spacing={24}>
            <Grid item xs={12} sm={3}>
              <FilterAlumniMenu
                nama={nama}
                gender={gender}
                domisili={domisili}
                angkatan={angkatan}
                gelar={gelar}
                posisi={posisi}
                industri={industri}
                perusahaan={perusahaan}
                handleChange={this.handleChange}
                handleSearch={this.handleSearch}
              />
            </Grid>

            <Grid item xs={12} sm={9}>
              <AlumniList query={this.state} />
            </Grid>
          </Grid>
        </Container>
      </React.Fragment>
    );
  }
}

function createContainer() {
  return authorize({
    mustVerified: true,
    roles: [ROLES.STAFF, ROLES.PUBLIC],
  })(withStyles(styles)(Screen));
}

export default createContainer();
