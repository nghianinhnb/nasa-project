import UserHelper from "general/helpers/UserHelper";
import { Redirect, Route } from "react-router-dom";


function PrivateRoute(props) {
  const isAuth = UserHelper.isAuthentication();
  return isAuth ? <Route {...props} /> : <Redirect to="/login" />;
}

export default PrivateRoute;
