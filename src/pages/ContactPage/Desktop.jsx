import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import { withAuth } from "../../components/hocs/auth";
import { NavbarAuth, NavbarWithSearch } from "../../components/stables/Navbar";
import { Container } from "../../components/Container";

import ContactList from "./ContactList";
import FilterMenu from "./FilterMenu";
import { Guidelines } from "../../styles";

const styles = theme => ({
  container: {
    ...Guidelines.layouts.mt32,
    ...Guidelines.layouts.pr40,
    ...Guidelines.layouts.pl40
  }
});

class Screen extends React.Component {
  static propTypes = {
    classes: PropTypes.shape().isRequired
  };

  state = {
    name: "",
    categories: []
  };

  handleSearch = ({ target }) => {
    this.setState({
      name: target.value
    });
  };

  handleToggle = value => () => {
    const { categories } = this.state;
    const currentIndex = categories.indexOf(value);
    const newCategories = [...categories];
    if (currentIndex === -1) {
      newCategories.push(value);
    } else {
      newCategories.splice(currentIndex, 1);
    }
    this.setState({
      categories: newCategories
    });
  };

  render() {
    const { classes } = this.props;
    const { categories, name } = this.state;

    return (
      <React.Fragment>
        <NavbarAuth title="Daftar Kontak" />
        <NavbarWithSearch
          inputProps={{
            onChange: this.handleSearch,
            value: name
          }}
        />
        <Container className={classes.container}>
          <Grid container spacing={24}>
            <Grid item xs={12} sm={3}>
              <FilterMenu onChange={this.handleToggle} handleCheck={this.handleCheck} categories={categories}/>
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
