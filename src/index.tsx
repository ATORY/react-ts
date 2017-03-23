/*
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './AppDemo';

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
*/


// react react-router redux

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import createHistory from 'history/createBrowserHistory';
// import { Route } from 'react-router';
import {
  HashRouter as Router,
  // BrowserRouter as Router,
  Switch,
  Route,
  Link,
  RouteComponentProps
} from 'react-router-dom';

import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux';
import thunk from 'redux-thunk';
import * as createLogger from 'redux-logger';
import reducers from './reducers';

const history = createHistory();
const logger = createLogger();

const middleware = routerMiddleware(history);

const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer,
  }),
  applyMiddleware(middleware, logger, thunk)
);

import Home from './Home';
import About from './About';
const Topics = () => <div>Topics</div>;

ReactDOM.render(
  <Provider store={store}>
    {/**
    <Router>
      <div>
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/about'>About</Link></li>
          <li><Link to='/topics'>Topics</Link></li>
        </ul>

        <hr />

        <Route exact path='/' component={Home} />
        <Route path='/about' component={About} />
        <Route path='/topics' component={Topics} />
      </div>
    </Router>
     */}
    { /* ConnectedRouter will use the store from Provider automatically */ }
    <ConnectedRouter history={history}>
      <div>
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/about'>About</Link></li>
          <li><Link to='/topics'>Topics</Link></li>
        </ul>
        <Route exact path='/' component={Home}/>
        <Route path='/about' component={About}/>
        <Route path='/topics' component={Topics}/>
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('app')
);
