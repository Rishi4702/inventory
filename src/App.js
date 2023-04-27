import React from "react";
/*import { BrowserRouter as Router, Route, Switch } from "react-router-dom";*/
import { Switch, Route } from 'react-router-dom';

import Register from "./components/Register";
import Contact from "./components/Contact";
i

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Register} />
            <Route exact path="/contact" component={Contact} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
