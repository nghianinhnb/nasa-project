import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { SoundsProvider, ThemeProvider, createSounds, createTheme } from "arwes";
import App from "./App";
import store from 'app/store'

import { theme, sounds } from "./settings";


ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={createTheme(theme)}>
      <SoundsProvider sounds={createSounds(sounds)}>
        <App />
      </SoundsProvider>
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);
