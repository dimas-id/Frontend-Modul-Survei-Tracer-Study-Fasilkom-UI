import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { withRouter } from "react-router";
import { Route, Switch } from "react-router-dom";

function Router({ paths, titleSuffix, match, children }) {
  return (
    <Switch>
      {paths &&
        paths.map(({ title, route }, index) => (
          <Route
            key={`${title}-${index}`}
            path={`${match.path === "/" ? "" : match.url}${route.path}`}
            exact={!!route.exact}
            render={props => (
              <React.Fragment>
                <Helmet>
                  <title>{`${title}${titleSuffix}`}</title>
                </Helmet>
                <route.component {...props} />
              </React.Fragment>
            )}
          />
        ))}
      {children}
    </Switch>
  );
}

export const RouterWrapper = withRouter(Router);
export default RouterWrapper;

RouterWrapper.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,

  paths: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      route: PropTypes.shape({
        path: PropTypes.string.isRequired,
        component: PropTypes.any.isRequired,
        exact: PropTypes.boolean,
      }),
    })
  ),
  titleSuffix: PropTypes.string,
};

RouterWrapper.defaultProps = {
  titleSuffix: " - ILUNI12",
};
