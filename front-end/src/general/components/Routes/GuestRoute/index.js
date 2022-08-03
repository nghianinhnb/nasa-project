import UserHelper from "general/helpers/UserHelper";
import { Redirect, Route } from "react-router-dom";


function GuestRoute(props) {
  const isAuth = UserHelper.isAuthentication();
  return isAuth ? <Redirect to="/" /> : <Route {...props} />;
}

export default GuestRoute;
