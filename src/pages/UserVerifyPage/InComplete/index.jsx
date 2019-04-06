import React from "react";
import PropTypes from "prop-types";
import pick from "lodash/pick";
import { withRouter } from "react-router";
import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import paths from "../../paths";
import { humanizeError, isStatusOK } from "../../../libs/response";
import { getDateFormatted } from "../../../libs/datetime";
import { verifyUser, loadUser } from "../../../modules/session/thunks";
import { getUser } from "../../../modules/session/selectors";
import InCompleteForm from "./InCompleteForm";
import { Guidelines } from "../../../styles";

const styles = theme => ({
  container: {
    ...Guidelines.layouts.flexDirCol,
    ...Guidelines.layouts.flexMiddle,
    ...Guidelines.layouts.w100,
    ...Guidelines.layouts.borderBox,
    ...Guidelines.layouts.pt64
  }
});

class InComlete extends React.Component {
  static propTypes = {
    classes: PropTypes.shape().isRequired,
    history: PropTypes.shape().isRequired,
    location: PropTypes.shape().isRequired
  };

  state = {
    loading: true,
    errorMessage: null
  };

  componentDidMount() {
    const { user, history, load } = this.props;
    load(user.id).then(() => {
      if (this.props.user.isVerified) {
        history.push(paths.HOME);
      } else {
        this.setState({ loading: false });
      }
    });
  }

  setErrorMessage(errorMessage) {
    this.setState({ errorMessage });
  }

  redirectToNextPage = () => {
    const { history } = this.props;
    history.replace(paths.REGISTER_WORK_POSITION);
  };

  getInitialValue() {
    const {
      birthdate,
      latestCsuiClassYear,
      latestCsuiProgram,
      uiSsoNpm
    } = InCompleteForm.fields;

    const { user } = this.props;
    const { profile } = user;
    return {
      ...pick(user, [uiSsoNpm]),
      ...pick(profile, [birthdate, latestCsuiClassYear, latestCsuiProgram])
    };
  }

  handleInComlete = (values, actions) => {
    this.setErrorMessage("");

    const {
      birthdate,
      latestCsuiClassYear,
      latestCsuiProgram,
      uiSsoNpm
    } = InCompleteForm.fields;

    const currentValues = { ...values };

    currentValues[birthdate] = getDateFormatted(currentValues[birthdate]);
    if (Boolean(currentValues[latestCsuiClassYear])) {
      currentValues[latestCsuiClassYear] = getDateFormatted(
        currentValues[latestCsuiClassYear],
        "YYYY"
      );
    }

    this.props
      .verifyUser(
        currentValues[birthdate],
        currentValues[latestCsuiClassYear],
        currentValues[latestCsuiProgram],
        currentValues[uiSsoNpm]
      )
      .catch(err => {
        const fields = [
          birthdate,
          latestCsuiClassYear,
          latestCsuiProgram,
          uiSsoNpm
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
        {!!errorMessage && (
          <Typography gutterBottom align="center" color="error">
            {errorMessage}
          </Typography>
        )}
        <InCompleteForm
          enableReinitialize
          onSubmit={this.handleInComlete}
          initialValues={this.getInitialValue()}
        />
      </div>
    );
  }
}

function createContainer() {
  const mapStateToProps = state => ({
    user: getUser(state)
  });

  const mapDispatchToProps = dispatch => ({
    load: userId => dispatch(loadUser(userId)),
    verifyUser: (birthdate, latestCsuiClassYear, latestCsuiProgram, uiSsoNpm) =>
      dispatch(
        verifyUser(birthdate, latestCsuiClassYear, latestCsuiProgram, uiSsoNpm)
      )
  });

  return withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(withStyles(styles)(InComlete))
  );
}

export default createContainer();
