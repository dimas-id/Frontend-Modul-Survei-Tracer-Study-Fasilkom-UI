import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import paths from "../../../paths";
import { humanizeError, isStatusOK } from "../../../../libs/response";
import { getDateFormatted } from "../../../../libs/datetime";
import { isLoggedIn } from "../../../../modules/session/selectors";
import { register } from "../../../../modules/session/thunks";
import RegistrationForm from "./RegistrationForm";
import { Guidelines } from "../../../../styles";

const styles = theme => ({
  container: {
    ...Guidelines.layouts.flexDirCol,
    ...Guidelines.layouts.flexMiddle,
    ...Guidelines.layouts.w100,
    ...Guidelines.layouts.borderBox,
  },
  title: {
    ...Guidelines.layouts.w100,
    ...Guidelines.fonts.bold,
    "&:nth-child(even)": {
      ...Guidelines.layouts.mb48,
    },
  },
});

class Registration extends React.Component {
  static propTypes = {
    classes: PropTypes.shape().isRequired,
    history: PropTypes.shape().isRequired,
    location: PropTypes.shape().isRequired,
  };

  state = {
    errorMessage: null,
  };

  componentDidMount() {
    if (this.props.isLoggedIn) {
      const { history } = this.props;
      history.replace(paths.HOME);
    }
  }

  setErrorMessage(errorMessage) {
    this.setState({ errorMessage });
  }

  redirectToNextPage = () => {
    const { history } = this.props;
    history.replace(paths.REGISTER_EDUCATION);
  };

  handleRegistration = (values, actions) => {
    this.setErrorMessage("");

    const {
      firstName,
      lastName,
      birthdate,
      linkedinUrl,
      email,
      password,
      repassword,
    } = RegistrationForm.fields;

    const currentValues = { ...values };
    currentValues[birthdate] = getDateFormatted(currentValues[birthdate]);

    this.props
      .register(currentValues)
      .catch(err => {
        const fields = [
          firstName,
          lastName,
          birthdate,
          linkedinUrl,
          email,
          password,
          repassword,
        ];

        const humanizedErr = humanizeError(err.response.data, fields);
        if (typeof humanizedError === "string") {
          this.setErrorMessage(humanizedErr);
        } else {
          actions.setErrors(humanizedErr);
        }
        actions.setSubmitting(false);
        return err;
      })
      .then(resp => isStatusOK(resp) && this.redirectToNextPage());
  };

  render() {
    const { classes } = this.props;
    const { errorMessage } = this.state;

    return (
      <div className={classes.container}>
        <Typography
          className={classes.title}
          gutterBottom
          variant="h4"
          align="left"
          component="h1"
        >
          Pendataan Anggota
        </Typography>
        <Typography
          className={classes.title}
          gutterBottom
          variant="h4"
          align="left"
          component="h1"
        >
          Alumni Fasilkom UI
        </Typography>
        {!!errorMessage && (
          <Typography gutterBottom align="center" color="error">
            {errorMessage}
          </Typography>
        )}
        <RegistrationForm onSubmit={this.handleRegistration} />
      </div>
    );
  }
}

function createContainer() {
  const mapStateToProps = state => ({
    isLoggedIn: isLoggedIn(state),
  });

  const mapDispatchToProps = dispatch => ({
    register: payload => dispatch(register(payload)),
  });

  return withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(withStyles(styles)(Registration))
  );
}

export default createContainer();
