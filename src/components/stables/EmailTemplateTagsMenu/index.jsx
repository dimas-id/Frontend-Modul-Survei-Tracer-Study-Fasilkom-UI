import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core/styles";
import {getTemplateTags} from "../../../modules/crm/mailer/thunks";
import {
  selectTemplateHtmlTags,
  selectTemplateFields,
  selectTemplateOperators,
} from "../../../modules/crm/mailer/selectors";

import Tags from "./Tags";

const styles = theme => ({
  root: {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  tagMenuWrapper: {
    marginBottom: theme.spacing.unit * 2,
  },
});

function EmailTemplateTagsMenu({
  classes,
  loadTags,
  html,
  variables,
  operators,
  onPick,
}) {
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    loadTags()
      .then(resp => {
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.tagMenuWrapper}>
        <Tags
          items={variables}
          title="Daftar variable"
          loading={loading}
          onPick={onPick}
        />
      </div>
      <div className={classes.tagMenuWrapper}>
        <Tags
          items={html}
          title="Daftar HTML"
          loading={loading}
          onPick={onPick}
        />
      </div>
      <div className={classes.tagMenuWrapper}>
        <Tags
          items={operators}
          title="Daftar Operator"
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
    operators: selectTemplateOperators(state),
  }),
  dispatch => ({
    loadTags: () => dispatch(getTemplateTags()),
  })
)(withStyles(styles)(EmailTemplateTagsMenu));
