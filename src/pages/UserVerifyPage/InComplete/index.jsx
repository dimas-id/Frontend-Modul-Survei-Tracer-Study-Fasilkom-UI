import React from "react";
import PropTypes from "prop-types";
import pick from "lodash/pick";
import omitBy from "lodash/omitBy";
import isNull from "lodash/isNull";
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
    loading: true
  };

  componentDidMount() {
    const { user, history, load } = this.props;
    Boolean(user) &&
      load(user.id).then(() => {
        if (this.props.user.isVerified) {
          history.replace(paths.HOME);
        } else {
          this.setState({ loading: false });
        }
      });
  }

  redirectToNextPage = () => {
    const { history } = this.props;
    history.replace(paths.REGISTER_WORK_POSITION);
  };

  getInitialValue() {
    const {
      firstName,
      lastName,
      birthdate,
      latestCsuiClassYear,
      latestCsuiProgram,
      uiSsoNpm
    } = InCompleteForm.fields;

    const defaultValues = {
      [firstName]: "",
      [lastName]: "",
      [birthdate]: new Date(),
      [latestCsuiClassYear]: new Date(),
      [latestCsuiProgram]: "",
      [uiSsoNpm]: ""
    };

    const { user } = this.props;
    if (Boolean(user)) {
      const { profile } = user;
      return {
        ...defaultValues,
        ...omitBy(pick(user, [firstName, lastName, uiSsoNpm]), isNull),
        ...omitBy(
          pick(profile, [birthdate, latestCsuiClassYear, latestCsuiProgram]),
          isNull
        )
      };
    }

    return defaultValues;
  }

  handleInComlete = (values, actions) => {
    const {
      firstName,
      lastName,
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
        currentValues[firstName],
        currentValues[lastName],
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
        if (typeof humanizedError !== "string") {
          actions.setErrors(humanizedErr);
        }
        actions.setSubmitting(false);
        return err.response;
      })
      .then(resp => isStatusOK(resp) && this.redirectToNextPage());
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
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
    verifyUser: (
      firstName,
      lastName,
      birthdate,
      latestCsuiClassYear,
      latestCsuiProgram,
      uiSsoNpm
    ) =>
      dispatch(
        verifyUser(
          firstName,
          lastName,
          birthdate,
          latestCsuiClassYear,
          latestCsuiProgram,
          uiSsoNpm
        )
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
