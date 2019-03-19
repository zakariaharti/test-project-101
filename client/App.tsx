import * as React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

const App: React.FC<{}> = () => {
  return(
    <Router>
      <Switch>
        <Route exact path="/" render={() => <div>home page</div>} />
      </Switch>
    </Router>
  );
};

export default App;
