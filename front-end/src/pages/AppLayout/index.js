import { useState, } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Frame, withSounds, withStyles } from "arwes";

import Centered from "general/components/Centered";
import Header from "general/components/Header";
import Footer from "general/components/Footer/index.js";

import Launch from "pages/Launch";
import History from "pages/History";
import Upcoming from "pages/Upcoming";

import style from "./style";


function AppLayout(props) {
  // MARK: --- Params ---
  const { sounds, classes } = props;
  const [frameVisible, setFrameVisible] = useState(true);


  // MARK: --- Functions ---
  const animateFrame = () => {
    setFrameVisible(false);
    setTimeout(() => {
      setFrameVisible(true);
    }, 600);
  };


  return (
    <div className={classes.content}>
      <Header onNav={animateFrame} />

      <Centered className={classes.centered}>
        <Frame animate 
          show={frameVisible} 
          corners={4} 
          style={{visibility: frameVisible ? "visible" : "hidden"}}>
          {anim => (
            <div style={{padding: "20px"}}>
            <Switch>
              <Redirect exact from="/" to="/launch" />

              <Route exact path="/launch" component={ () => <Launch sounds={sounds} entered={anim.entered}/> }/>

              <Route exact path="/upcoming" component={ () => <Upcoming sounds={sounds} entered={anim.entered}/> }/>

              <Route exact path="/history" component={ () => <History sounds={sounds} entered={anim.entered}/> }/>

            </Switch>
            </div>
          )}
        </Frame>
      </Centered>

      <Footer />
    </div>
  )
};

export default withSounds()(withStyles(style)(AppLayout));
