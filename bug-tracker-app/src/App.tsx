import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import BugTracker from './bugTracker';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={BugTracker} />
      </Switch>
    </Router>
  );
}
