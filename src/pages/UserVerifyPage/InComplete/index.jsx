import { withStyles } from "@material-ui/core/styles";
import isNull from "lodash/isNull";
import omitBy from "lodash/omitBy";
import pick from "lodash/pick";
import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { getDateFormatted } from "../../../libs/datetime";
import { humanizeError, isStatusOK } from "../../../libs/response";
import { getUser } from "../../../modules/session/selectors";
import { loadUser, verifyUser } from "../../../modules/session/thunks";
import { Guidelines } from "../../../styles";
import moment from "moment";
import Typography from "@material-ui/core/Typography";
import amber from "@material-ui/core/colors/amber";
import paths from "../../paths";
import InCompleteForm from "./InCompleteForm";
import {
  loadEducations,
  createEducations,
} from "../../../modules/experience/thunks";
import { getEducations } from "../../../modules/experience/selectors";
import isEmpty from "lodash/isEmpty";
import { NavbarBack } from "../../../components/stables/Navbar";
import { Container } from "../../../components/Container";

const styles = theme => ({
  container: {
    ...Guidelines.layouts.flexDirCol,
    ...Guidelines.layouts.flexMiddle,
    ...Guidelines.layouts.w100,
    ...Guidelines.layouts.borderBox,
    ...Guidelines.layouts.pt32,
    ...Guidelines.layouts.pb32,
  },
  verifyContainer: {
    backgroundColor: amber[100],
    flexWrap: "wrap",
    ...Guidelines.layouts.w100,
    ...Guidelines.layouts.flexMiddleSpaceBetween,
    ...Guidelines.layouts.pt24,
    ...Guidelines.layouts.pr24,
    ...Guidelines.layouts.pl24,
    ...Guidelines.layouts.pb24,
    ...Guidelines.layouts.mb24,
  },
});

class InComlete extends React.Component {
  static propTypes = {
    classes: PropTypes.shape().isRequired,
    history: PropTypes.shape().isRequired,
    location: PropTypes.shape().isRequired,
  };

  state = {
    loading: true,
    isEduEmpty: isEmpty(this.props.educations),
  };

  componentDidMount() {
    const { user, history, loadUser, loadEducation } = this.props;
    if (Boolean(user)) {
      loadUser(user.id).then(() => {
        if (this.props.user.isVerified) {
          history.replace(paths.HOME);
        } else {
          loadEducation(user.id).then(() => {
            this.setState({
              loading: false,
              isEduEmpty: isEmpty(this.props.educations),
            });
          });
        }
      });
    }
  }

  redirectToNextPage = () => {
    const { history } = this.props;
    history.replace(paths.HOME);
  };

  getInitialValue() {
    const {
      firstName,
      lastName,
      birthdate,
      degreeAndStudyPrograms,
      csuiClassYear,
      csuiProgram,
      uiSsoNpm,
    } = InCompleteForm.fields;

    const defaultValues = {
      [firstName]: "",
      [lastName]: "",
      [birthdate]: new Date(),
      [degreeAndStudyPrograms]: [
        {
          [csuiClassYear]: moment("1986-01-01"),
          [csuiProgram]: "",
          [uiSsoNpm]: "",
        },
      ],
    };

    const { user } = this.props;

    const { profile } = user;

    const fromProfile = omitBy(pick(profile, [birthdate]), isNull);

    if (!this.state.isEduEmpty) {
      const { educations } = this.props;

      let currentEdu = { [degreeAndStudyPrograms]: [] };
      educations.forEach(edu => {
        currentEdu[degreeAndStudyPrograms].push({
          [csuiClassYear]: new Date(
            edu.csuiClassYear || new Date().getFullYear(),
            1,
            1
          ),
          [csuiProgram]: edu.csuiProgram,
          [uiSsoNpm]: edu.uiSsoNpm,
        });
      });

      return {
        ...defaultValues,
        ...omitBy(pick(user, [firstName, lastName]), isNull),
        ...fromProfile,
        ...currentEdu,
      };
    }

    return {
      ...defaultValues,
      ...omitBy(pick(user, [firstName, lastName]), isNull),
      ...fromProfile,
    };
  }

  handleInComplete = (values, actions) => {
    const {
      firstName,
      lastName,
      birthdate,
      degreeAndStudyPrograms,
      uiSsoNpm,
      csuiClassYear,
      csuiProgram,
    } = InCompleteForm.fields;

    const currentValues = { ...values };

    let eduPayload = [];
    for (
      let i = 0;
      i < Object.keys(currentValues[degreeAndStudyPrograms]).length;
      i++
    ) {
      eduPayload.push({
        uiSsoNpm: currentValues[degreeAndStudyPrograms][i][uiSsoNpm],
        csuiClassYear: getDateFormatted(
          currentValues[degreeAndStudyPrograms][i][csuiClassYear],
          "YYYY"
        ),
        csuiProgram: currentValues[degreeAndStudyPrograms][i][csuiProgram],
      });
    }

    this.props.createEducations(eduPayload);

    currentValues[birthdate] = getDateFormatted(currentValues[birthdate]);

    const userParams = [
      currentValues[firstName],
      currentValues[lastName],
      currentValues[birthdate],
    ];

    this.props
      .verifyUser(...userParams)
      .catch(err => {
        const fields = [birthdate];

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
    const { classes, user } = this.props;
    const title = !user.isComplete ? "Lengapi Akun" : "Verifikasi Akun";
    return (
      <React.Fragment>
        <NavbarBack title={title} />
        <Container>
          <div className={classes.container}>
            <div className={classes.verifyContainer}>
                <Typography variant="body1">
                    Pastikan informasi yang Anda berikan sesuai dengan data Anda selama
                    berkuliah di Fasilkom UI.
                </Typography>
            </div>
            <InCompleteForm
              enableReinitialize
              onSubmit={this.handleInComplete}
              initialValues={this.getInitialValue()}
            />
          </div>
        </Container>
      </React.Fragment>
    );
  }
}

function createContainer() {
  const mapStateToProps = state => ({
    user: getUser(state),
    educations: getEducations(state),
  });

  const mapDispatchToProps = dispatch => ({
    loadUser: userId => dispatch(loadUser(userId)),
    loadEducation: userId => dispatch(loadEducations(userId)),
    verifyUser: (firstName, lastName, birthdate) =>
      dispatch(verifyUser(firstName, lastName, birthdate)),
    createEducations: payload => dispatch(createEducations(payload)),
  });

  return withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(withStyles(styles)(InComlete))
  );
}

export default createContainer();
