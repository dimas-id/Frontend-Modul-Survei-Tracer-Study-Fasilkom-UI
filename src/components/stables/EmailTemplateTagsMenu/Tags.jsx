import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import isEmpty from "lodash/isEmpty";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import {LoadingFill} from "../../Loading";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    maxHeight: 200,
    overflowY: "scroll",
    position: 'relative',
  },
  listItem: {
    whiteSpace: "nowrap",
  },
});

function EmailTemplateTags({classes, onPick, items = [], title, loading}) {
  const isItemsEmpty = isEmpty(items);

  return (
    <div>
      <Typography variant="h5" component="h4">
        {title}
      </Typography>
      <Paper className={classes.root} elevation={1}>
        {Boolean(loading) && <LoadingFill />}
        {!Boolean(loading) && !isItemsEmpty && (
          <List dense>
            {items.map(value => (
              <ListItem key={value} button className={classes.listItem}>
                <ListItemText primary={value} onClick={() => onPick(value)} />
              </ListItem>
            ))}
          </List>
        )}
        {!Boolean(loading) && isItemsEmpty && <div>Kosong</div>}
      </Paper>
    </div>
  );
}

EmailTemplateTags.propTypes = {
  classes: PropTypes.object.isRequired,
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
  loading: PropTypes.bool,
};

export default withStyles(styles)(EmailTemplateTags);
