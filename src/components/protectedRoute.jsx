import UserContext from "../context/userContext";
import { useContext } from "react";
import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = ({ component: Component, authType, ...rest }) => {
  const user = useContext(UserContext);
  return (
    <Route
      {...rest}
      render={(props) => {
        if ((user && authType) || (!user && !authType)) {
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
