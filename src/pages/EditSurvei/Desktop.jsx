import React from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { authorize, ROLES } from "../../components/hocs/auth";
import { Guidelines } from "../../styles";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import PertanyaanEdit from "../../components/PertanyaanEdit";
import atlasV3 from "../../modules/api/atlas/v3";


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
          this.setState({ list_opsi_jawaban: result.data.listOpsiJawaban });
        })
        .catch((error) => {
          if (error.response && error.response.status === 404) {
          this.setState({ notFound: true });
          }
        })
        .finally(() => {
          this.setState({ loading: false });
        });
    });
  }

  render() {
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
              <PertanyaanEdit
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

function createContainer() {
  return authorize({
    mustVerified: true,
    roles: [ROLES.STAFF],
  })(withRouter(withStyles(styles)(Screen)));
}

export default createContainer();
