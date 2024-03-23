import { getToken } from "../services/auth";
import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = ({ component: Component, authType, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if ((getToken() && authType) || (!getToken() && !authType)) {
          return <Component {...rest} {...props} />;
        }
        return (
          <Redirect
            to={{
              pathname: "/unauthorized",
              state: {
                from: props.location,
              },
            }}
          />
        );
      }}
    />
  );
};

export default ProtectedRoute;
