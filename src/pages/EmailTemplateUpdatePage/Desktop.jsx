import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import { withAuth } from "../../components/hocs/auth";
import { NavbarAuth, NavbarBack } from "../../components/stables/Navbar";
import { Container } from "../../components/Container";
import { Guidelines } from "../../styles";
import EmailTemplateForm from "../../components/stables/EmailTemplateForm";
import EmailTemplateVariableMenu from "../../components/stables/EmailTemplateVariableMenu";

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
    classes: PropTypes.shape().isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      body: ""
    };
  }

  handleVariable(variable) {
    this.setState(prevState => ({
      body: prevState.body + " " + variable + " "
    }));
  }

  handleTitle({ target }) {
    this.setState({
      title: target.value
    });
  }

  handleBody({ target }) {
    this.setState({
      body: target.value
    });
  }

  render() {
    const { classes } = this.props;
    const { title, body } = this.state;

    return (
      <React.Fragment>
        <NavbarAuth title="Ubah Templat Email" />
        <NavbarBack />
        <Container className={classes.container}>
          <Grid container spacing={24}>
            <Grid item xs={12} sm={9}>
              <EmailTemplateForm
                title={title}
                body={body}
                onChangeTitle={this.handleTitle.bind(this)}
                onChangeBody={this.handleBody.bind(this)}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <EmailTemplateVariableMenu
                onPick={this.handleVariable.bind(this)}
              />
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
