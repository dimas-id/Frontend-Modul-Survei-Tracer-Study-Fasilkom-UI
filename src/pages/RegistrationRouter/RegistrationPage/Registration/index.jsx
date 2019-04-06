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
    ...Guidelines.layouts.borderBox
  },
  title: {
    ...Guidelines.layouts.w100,
    ...Guidelines.fonts.bold,
    "&:nth-child(even)": {
      ...Guidelines.layouts.mb48
    }
  }
});

function getInitialValue() {
  return {
    firstName: null,
    lastName: null,
    birthdate: null,
    latestCsuiClassYear: null,
    latestCsuiProgram: null,
    uiSsoNpm: null,
    email: null,
    password: null,
    repassword: null
  };
}

class Registration extends React.Component {
  static propTypes = {
    classes: PropTypes.shape().isRequired,
    history: PropTypes.shape().isRequired,
    location: PropTypes.shape().isRequired
  };

  state = {
    errorMessage: null
  };

  componentDidMount() {
    if (this.props.isLoggedIn) {
      this.redirectToNextPage();
    }
  }

  setErrorMessage(errorMessage) {
    this.setState({ errorMessage });
  }

  redirectToNextPage = () => {
    const { history } = this.props;
    history.replace(paths.REGISTER_WORK_POSITION);
  };

  handleRegistration = (values, actions) => {
    this.setErrorMessage("");

    const {
      firstName,
      lastName,
      birthdate,
      latestCsuiClassYear,
      latestCsuiProgram,
      uiSsoNpm,
      email,
      password,
      repassword
    } = RegistrationForm.fields;

    const currentValues = { ...values };

    if (currentValues[password] !== currentValues[repassword]) {
      actions.setFieldError(repassword, "Konfirmasi password tidak sama");
      actions.setSubmitting(false);
      return;
    }

    currentValues[birthdate] = getDateFormatted(currentValues[birthdate]);
    currentValues[latestCsuiClassYear] = getDateFormatted(
      currentValues[latestCsuiClassYear],
      "YYYY"
    );

    this.props
      .register(currentValues)
      .catch(err => {
        const fields = [
          firstName,
          lastName,
          birthdate,
          latestCsuiClassYear,
          latestCsuiProgram,
          uiSsoNpm,
          email,
          password,
          repassword
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
        <RegistrationForm
          onSubmit={this.handleRegistration}
          initialValues={getInitialValue()}
        />
      </div>
    );
  }
}

function createContainer() {
  const mapStateToProps = state => ({
    isLoggedIn: isLoggedIn(state)
  });

  const mapDispatchToProps = dispatch => ({
    register: payload => dispatch(register(payload))
  });

  return withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(withStyles(styles)(Registration))
  );
}

export default createContainer();
