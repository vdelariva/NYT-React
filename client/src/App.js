import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Articles from "./pages/Articles";
import NoMatch from "./pages/NoMatch";

const App = () => (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={Articles} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  </Router>
);

export default App;
