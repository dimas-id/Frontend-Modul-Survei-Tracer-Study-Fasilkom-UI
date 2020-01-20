import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { getTemplateTags } from "../../../modules/crm/mailer/thunks";
import {
  selectTemplateHtmlTags,
  selectTemplateFields,
} from "../../../modules/crm/mailer/selectors";

import Tags from "./Tags";

const styles = theme => ({
  root: {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  tagMenuWrapper: {
    marginBottom: theme.spacing.unit * 3,
  },
  header: {
  }
});

function EmailTemplateTagsMenu({ classes, loadTags, html, variables, onPick }) {
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    loadTags()
      .then(resp => {
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [loadTags]);

  return (
    <div className={classes.root}>
      <div className={classes.tagMenuWrapper}>
        <h3 style={{ marginTop: 0 }} className={classes.header}>
          Daftar Variable
        </h3>
        <Tags
          items={variables}
          loading={loading}
          onPick={onPick}
        />
      </div>
      <div className={classes.tagMenuWrapper}>
        <h3 style={{ marginTop: 0 }} className={classes.header}>
          Daftar HTML
        </h3>
        <Tags
          items={html}
          loading={loading}
          onPick={onPick}
        />
      </div>
    </div>
  );
}

EmailTemplateTagsMenu.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(
  state => ({
    html: selectTemplateHtmlTags(state),
    variables: selectTemplateFields(state),
  }),
  dispatch => ({
    loadTags: () => dispatch(getTemplateTags()),
  })
)(withStyles(styles)(EmailTemplateTagsMenu));
