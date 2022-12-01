import React from 'react';

import usePrepareLink from "~/hooks/router/usePrepareLink";
import {Route} from "react-router-dom";

const AuthRoute = ({ children, isAuthorized, ...rest }) => {
  const loginLink = usePrepareLink({
    to: "/login",
    isRelativePath: true
  });

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthorized ? (
          children
        ) : (
          <Redirect
            to={{
              ...loginLink,
              state: { from: location }
            }}
          />
        )
      }
    />
  );
};

export default AuthRoute;
