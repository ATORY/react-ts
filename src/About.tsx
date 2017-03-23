
import * as React from 'react';
import { connect } from 'react-redux';
import { DEC, INC } from './actions';


import {
  HashRouter as Router,
  // BrowserRouter as Router,
  Switch,
  Route,
  Link,
  RouteComponentProps
} from 'react-router-dom';

class Child extends React.Component<RouteComponentProps<{ id: string }>, {}> {
  render() {
    const { match } = this.props;
    return (
      <div>
        <h3>ID: {match.params.id}</h3>
      </div>
    );
  }
}

interface ConnectedProps {
  test: number;
  DEC(): void;
  INC(): void;
}

export default class About extends React.Component<{}, {}> {
  render() {
    return (
      <div>
        <ul>
          <li><Link to="/about/netflix">Netflix</Link></li>
          <li><Link to="/zillow-group">Zillow Group</Link></li>
          <li><Link to="/yahoo">Yahoo</Link></li>
          <li><Link to="/modus-create">Modus Create</Link></li>
        </ul>
        <Route path="/about/:id" component={Child} />
      </div>
    );
  }
}
