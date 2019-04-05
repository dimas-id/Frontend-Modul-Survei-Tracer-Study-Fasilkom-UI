import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { withStyles } from '@material-ui/core/styles';
import Card from "@material-ui/core/Card";
import Typography from '@material-ui/core/Typography';

import { withAuth } from '../../components/hocs/auth';
import { NavbarBack, NavbarAuth } from '../../components/stables/Navbar';
import { Container } from '../../components/Container';
import ChantCard from "../../components/stables/Chant";

import fixture from "./fixture.json";

import { layouts } from "../../styles/guidelines";

const styles = theme => ({
  card : {
    ...layouts.ml64,
    ...layouts.mt64,
    ...layouts.mb8,
  },
  endCard : {
    ...layouts.pt16,
    ...layouts.pb16,
    height: "60px",
    backgroundColor: "#9f9fa0"
  }
});

class Screen extends React.PureComponent {
  static propTypes = {
    classes: PropTypes.shape().isRequired,
  };

  render() {
    const { classes } = this.props;
    const distanceToParent = fixture[0].level;

    return (
      <React.Fragment>
        <NavbarAuth />
        <NavbarBack />
        <Container>
        {fixture.map((chant) => (
                <div className = {classes.card}>
                  <ChantCard overflow={(chant.level - distanceToParent === 0) ? "visible" : "hidden"} 
                      max={(chant.level - distanceToParent === 0) ? "" : "64px"} 
                      margin={(chant.level-distanceToParent)*80} id={chant.id} key={chant.id} 
                      dateCreated={chant.dateCreated} numberLikes={chant.numberLikes} 
                      title={chant.title} body={chant.body} channel={chant.channel}/>
                </div>
              ))}
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
