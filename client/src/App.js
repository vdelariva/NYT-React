import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Articles from "./pages/Articles";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";

const App = () => (
  <Router>
    <div>
      <Nav brand="New York Times - Search Articles">
        Search for and annotate articles of interest!
      </Nav>
      <Switch>
        <Route exact path="/" component={Articles} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  </Router>
);

export default App;
