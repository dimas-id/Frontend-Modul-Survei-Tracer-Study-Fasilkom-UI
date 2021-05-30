import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Guidelines } from "../../../styles";
import JotformEmbed from 'react-jotform-embed';
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { loadEducations } from "../../../modules/experience/thunks";
import { getEducations } from "../../../modules/experience/selectors";
import {
  getUser
} from "../../../modules/session/selectors";

const styles = () => ({
  paper: {
    ...Guidelines.layouts.pt32,
    ...Guidelines.layouts.pr32,
    ...Guidelines.layouts.pl32,
    ...Guidelines.layouts.pb32
  },
  title: {
    ...Guidelines.layouts.flexMiddle,
    ...Guidelines.fonts.medium,
    fontSize: 32
  },
  subtitle: {
    ...Guidelines.layouts.flexMiddle,
    ...Guidelines.layouts.mb48,
    fontSize: 20
  },
});

class IframePage extends React.Component {
  
render() {
  const { classes, user, educations } = this.props;
  if (educations && user && user.isVerified ) {
    const URL = `https://form.jotform.com/211483360465050?email=${user.email}&name=${user.name}&npm=${educations[0].uiSsoNpm}`
    return (
      
      <React.Fragment>
          <Typography className={classes.title} variant="h5" component="h3">
            Voting Bakal Calon Ketua Iluni12
          </Typography>      
          {/* <Typography className={classes.subtitle} component="p">
            Voting Page Subtitle
          </Typography> */}
      <JotformEmbed src={URL} />
      </React.Fragment>
  );
  }
      return (
      <React.Fragment>
          <Typography className={classes.title} variant="h5" component="h3">
            Anda belum terverifikasi
          </Typography>      
          {/* TODO: Copy component informasi belum terverifikasi */}
      </React.Fragment>
  );
}
}

function createContainer() {
  const mapStateToProps = state => ({
    educations: getEducations(state),
    user: getUser(state),
  });

  const mapDispatchToProps = dispatch => ({
    load: user => dispatch(loadEducations(user.id)),
  });

  return connect(
    mapStateToProps,
    mapDispatchToProps
    )(withStyles(styles)(IframePage));
}

export default createContainer();



