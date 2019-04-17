import React from "react";
import PropTypes from "prop-types";

import {withStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import {authorize, ROLES} from "../../components/hocs/auth";
import {NavbarAuth, NavbarBackWithSearch} from "../../components/stables/Navbar";
import {Container} from "../../components/Container";

import ContactList from "./ContactList";
import FilterMenu from "./FilterMenu";
import {Guidelines} from "../../styles";
import Particle from "../../components/Particle";

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
    name: "",
    categories: [],
  };

  handleSearch = ({target}) => {
    this.setState({
      name: target.value,
    });
  };

  handleToggle = value => () => {
    const {categories} = this.state;
    const currentIndex = categories.indexOf(value);
    const newCategories = [...categories];
    if (currentIndex === -1) {
      newCategories.push(value);
    } else {
      newCategories.splice(currentIndex, 1);
    }
    this.setState({
      categories: newCategories,
    });
  };

  render() {
    const {classes} = this.props;
    const {categories, name} = this.state;

    return (
      <React.Fragment>
        <NavbarAuth title="Daftar Kontak"/>
        <NavbarBackWithSearch
          inputProps={{
            placeholder: "Cari kontak alumni...",
            onChange: this.handleSearch,
            value: name,
          }}
        />
        <Particle name="cloud2" left={0} top={160}/>
        <Container className={classes.container}>
          <Grid container spacing={24}>
            <Grid item xs={12} sm={3}>
              <FilterMenu
                onChange={this.handleToggle}
                handleCheck={this.handleCheck}
                categories={categories}
              />
            </Grid>
            <Grid item xs={12} sm={9}>
              <ContactList query={this.state}/>
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
    roles: [ROLES.STAFF],
  })(withStyles(styles)(Screen));
}

export default createContainer();
