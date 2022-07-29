import { BrowserRouter } from "react-router-dom";
import { Arwes } from "arwes";

import AppLayout from "./general/components/AppLayout";

import { resources } from "./settings";

const App = () => {
  return (
    <Arwes animate background={resources.background.large} pattern={resources.pattern}>
      {anim => (
        <BrowserRouter>
          <AppLayout show={anim.entered} />
        </BrowserRouter>
      )}
    </Arwes>
  )
};

export default App;
