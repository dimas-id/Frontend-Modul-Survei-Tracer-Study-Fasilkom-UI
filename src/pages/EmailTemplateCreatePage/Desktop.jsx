import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { withStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";

import { withAuth } from '../../components/hocs/auth';
import { NavbarAuth, NavbarBack } from '../../components/stables/Navbar';
import { Container } from '../../components/Container';
import { Guidelines } from "../../styles";
import EmailTemplateForm from '../../components/EmailTemplateForm';
import EmailTemplateVariableMenu from '../../components/EmailTemplateVariableMenu';

const styles = theme => ({
  container: {
    ...Guidelines.layouts.flexDirRow,
    ...Guidelines.layouts.mt32,
    ...Guidelines.layouts.mr64,
    ...Guidelines.layouts.ml64
  }
});

class Screen extends React.PureComponent {
  static propTypes = {
    classes: PropTypes.shape().isRequired,
  };
  state = {
    variableText: "",
  };

  handleSubmit(val) {
    this.setState({
      variableText: val
    });
  
  } 

  render() {
    const { classes } = this.props;
    console.log(this.state.variableText)
    return (
      <React.Fragment>
      <NavbarAuth title="Buat Templat Email" />
      <NavbarBack />
      <Container className={classes.container}>
        <Grid container spacing={24}>
          <Grid item xs={12} sm={9}>
            <EmailTemplateForm />
          </Grid>
          <Grid item xs={12} sm={3}>
          <EmailTemplateVariableMenu onSubmit={this.handleSubmit.bind(this)}/>
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
