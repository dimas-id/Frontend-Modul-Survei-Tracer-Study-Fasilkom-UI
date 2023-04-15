import React from "react";
import { withRouter, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { authorize, ROLES } from "../../components/hocs/auth";
import { Guidelines } from "../../styles";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Jawaban from "../../components/Jawaban";
import atlasV3 from "../../modules/api/atlas/v3";

import {
  getUser,
  selectCurrentUserGroups,
} from "../../modules/session/selectors";
import { connect } from "react-redux";

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
    location: PropTypes.object.isRequired,
  };
  state = {
    survei: null,
    list_pertanyaan: null,
    list_opsi_jawaban: null,
    loading: true,
    notFound: false,
  };

  componentDidMount() {
    this.handleLoad();
  }

  handleLoad() {
    const survei_id = this.props.match.params;
    this.setState({ loading: true }, () => {
      atlasV3.survei
        .getSurveiById(survei_id.survei_id)
        .then(result => {
          this.setState({ survei: result.data.survei });
          this.setState({ list_pertanyaan: result.data.listPertanyaan });
          this.setState({
            list_opsi_jawaban: result.data.listOpsiJawaban,
          });
        })
        .catch((error) => {
          if (error.response && error.response.status === 404) {
            // Set notFound state variable to true if the server returns a 404 error
            this.setState({ notFound: true });
          }
        })
        .finally(() => {
          this.setState({ loading: false });
        });
    });
  }

  render() {
    const { notFound } = this.state; // Destructure notFound state variable
    if (notFound) {
      // Render a Redirect component to the custom error page if notFound is true
      return <Redirect to="/404" />;
    }
    return (
      <React.Fragment>
        <div
          style={{
            backgroundColor: "#F6F1F1",
            minHeight: "100vh",
          }}
        >
          {this.state.survei &&
            this.state.list_pertanyaan &&
            this.state.list_opsi_jawaban && (
              <Jawaban
                survei={this.state.survei}
                list_pertanyaan={this.state.list_pertanyaan}
                list_opsi_jawaban={this.state.list_opsi_jawaban}
                user = {this.props.user}
              />
            )}
        </div>
        <ToastContainer />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  user: getUser(state), // Get the current logged in user ID from the Redux store
  groups: selectCurrentUserGroups(state),
});

function createContainer() {

  return authorize({
    mustVerified: true,
    roles: [ROLES.PUBLIC],
  })(withRouter(withStyles(styles)((connect(mapStateToProps)(Screen)))));
}

export default createContainer();
