import { 
  Logo,
  Words,
  Header as ArwesHeader,
  Highlight,
  withStyles,
} from "arwes";
import { Link } from "react-router-dom";
import Clickable from "../Clickable";
import Centered from "../Centered";

import style from "./style";


function Header(props) {
  // MARK: --- params ---
  const { classes, onNav, ...rest } = props;


  return (
    <ArwesHeader animate>
      <Centered className={classes.root} {...rest}>
        {/* LOGO  */}
        <Logo animate size={50} className={classes.logo} layer="header" />

        <Words animate className={classes.banner}>
          MISSION CONTROL
        </Words>
        {/* END LOGO  */}

        {/* NAV BAR  */}
        <nav className={`${classes.nav}`}>
          <Clickable className={classes.clickable} onClick={onNav}>
            <Highlight className={classes.button} animate layer="header">
              <Link className={classes.link} to="/launch">
                <i className="material-icons">check_circle_outline</i>Launch
              </Link>
            </Highlight>
          </Clickable>

          <Clickable className={classes.clickable} onClick={onNav}>
            <Highlight className={classes.button} animate layer="header">
              <Link className={classes.link} to="/upcoming">
              <i className="material-icons">update</i>Upcoming</Link>
            </Highlight>
          </Clickable>

          <Clickable className={classes.clickable} onClick={onNav}>
            <Highlight className={classes.button} animate layer="header">
              <Link className={classes.link} to="/history">
              <i className="material-icons">history</i>History</Link>
            </Highlight>
          </Clickable>

          <Clickable className={classes.clickable} onClick={onNav}>
            <Highlight className={classes.button} animate layer="header">
              <Link className={classes.link} to="/login">
              <i className="material-icons">login</i>Login</Link>
            </Highlight>
          </Clickable>
        </nav>
        {/* END NAV BAR  */}
      </Centered>
    </ArwesHeader>
  )
};


export default withStyles(style)(Header);
