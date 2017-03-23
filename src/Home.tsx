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

class Home extends React.Component<ConnectedProps, {}> {
  render() {
    const { DEC, INC, test } = this.props;
    return (
      <div>
        Home {test}
        <button onClick={INC}>+</button>
        <button onClick={DEC}>-</button>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  test: state.test,
});

export default connect(
  mapStateToProps,
  { DEC, INC }
)(Home);