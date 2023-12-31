/**
 * FOR MORE INFORMATION
 * https://github.com/iamhosseindhv/notistack#documentation
 */
import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { SnackbarProvider as Provider, withSnackbar } from "notistack";
import { utilityActions } from "../../modules/utility";
import { getSnackbarNotifications } from "../../modules/utility/selectors";

class Notifier extends React.Component {
  displayed = [];

  storeDisplayed = id => {
    this.displayed = [...this.displayed, id];
  };

  shouldComponentUpdate({ notifications: newSnacks = [] }) {
    const { notifications: currentSnacks } = this.props;
    let notExists = false;
    for (let i = 0; i < newSnacks.length; i += 1) {
      if (notExists) continue;
      notExists =
        notExists ||
        !currentSnacks.filter(({ key }) => newSnacks[i].key === key).length;
    }
    return notExists;
  }

  componentDidUpdate() {
    const { notifications = [] } = this.props;

    notifications.forEach(notification => {
      // Do nothing if snackbar is already displayed
      if (this.displayed.includes(notification.key)) return;
      // Display snackbar using notistack
      this.props.enqueueSnackbar(notification.message, notification.options);
      // Keep track of snackbars that we've displayed
      this.storeDisplayed(notification.key);
      // Dispatch action to remove snackbar from redux store
      this.props.removeSnackbar(notification.key);
    });
  }

  render() {
    return null;
  }
}

const mapStateToProps = state => ({
  notifications: getSnackbarNotifications(state)
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { removeSnackbar: utilityActions.removeSnackbar },
    dispatch
  );

export const SnackbarNotifier = connect(
  mapStateToProps,
  mapDispatchToProps
)(withSnackbar(Notifier));

export function SnackbarProvider(props) {
  return <Provider preventDuplicate>{props.children}</Provider>;
}
