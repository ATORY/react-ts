import * as React from 'react';
import {
  // HashRouter as Router,
  BrowserRouter as Router,
  Route,
  Link,
  RouteComponentProps
} from 'react-router-dom';

// BasicExample
/*
class Home extends React.Component<{}, {}> {
  render() {
    return (
      <div>
        <h2>Home</h2>
      </div>
    )
  }
}

class About extends React.Component<{}, {}> {
  render() {
    return (
      <div>
        <h2>About</h2>
      </div>
    )
  }
}

class Topics extends React.Component<RouteComponentProps<{}>, {}> {
  render() {
    const { match } = this.props;
    return (
      <div>
        <h2>Topics</h2>
        <ul>
          <li>
            <Link to={`${match.url}/rendering`}>
              Rendering with React
        </Link>
          </li>
          <li>
            <Link to={`${match.url}/components`}>
              Components
        </Link>
          </li>
          <li>
            <Link to={`${match.url}/props-v-state`}>
              Props v. State
        </Link>
          </li>
        </ul>

        <Route path={`${match.url}/:topicId`} component={Topic} />
        <Route exact path={match.url} render={() => (
          <h3>Please select a topic.</h3>
        )} />
      </div>
    )
  }
}

class Topic extends React.Component<RouteComponentProps<{ topicId: string }>, {}> {
  render() {
    const { match } = this.props;
    return (
      <div>
        <h3>{match.params.topicId}</h3>
      </div>
    )
  }
}

class BasicExample extends React.Component<{}, {}> {
  render() {
    return (
      <Router>
        <div>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/topics">Topics</Link></li>
          </ul>

          <hr />

          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/topics" component={Topics} />
        </div>
      </Router>
    )
  }
}
*/

// URL ParamsExample
/*
class Child extends React.Component<RouteComponentProps<{ id: string }>, {}> {
  render() {
    const { match } = this.props;
    return (
      <div>
        <h3>ID: {match.params.id}</h3>
      </div>
    )
  }
}

const ParamsExample = () => (
  <Router>
    <div>
      <h2>Accounts</h2>
      <ul>
        <li><Link to="/netflix">Netflix</Link></li>
        <li><Link to="/zillow-group">Zillow Group</Link></li>
        <li><Link to="/yahoo">Yahoo</Link></li>
        <li><Link to="/modus-create">Modus Create</Link></li>
      </ul>
      <Route path="/:id" component={Child} />
    </div>
  </Router>
)

export default ParamsExample
*/

// Redirect AuthExample
////////////////////////////////////////////////////////////
// 1. Click the public page
// 2. Click the protected page
// 3. Log in
// 4. Click the back button, note the URL each time
/*
import { Redirect, withRouter, RouteProps } from 'react-router-dom';
import { PartialRouteComponentProps } from 'react-router-dom';

const Public = () => <h3>Public</h3>;
const Protected = () => <h3>Protected</h3>;

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb: Function) {
    this.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb: Function) {
    this.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

// class _AuthButton 

class AuthButtonD extends React.Component<RouteComponentProps<{}>, {}> {
  render() {
    const { history } = this.props;
    return (
      fakeAuth.isAuthenticated ? (
        <p>
          Welcome! <button onClick={() => {
            fakeAuth.signout(() => history.push('/'))
          }}>Sign out</button>
        </p>
      ) : (
          <p>You are not logged in.</p>
        )
    );
  }
}
const AuthButton = withRouter(AuthButtonD);

// const AuthButton = withRouter(({ history }) => (
//   fakeAuth.isAuthenticated ? (
//     <p>
//       Welcome! <button onClick={() => {
//         fakeAuth.signout(() => history.push('/'))
//       }}>Sign out</button>
//     </p>
//   ) : (
//       <p>You are not logged in.</p>
//     )
// ))


class PrivateRoute extends React.Component<RouteProps, void> {
  render() {
    const { path } = this.props;
    const component = this.props.component as React.ComponentClass<PartialRouteComponentProps<void> | void>;
    return (
      <Route path={path} render={props => (
        fakeAuth.isAuthenticated ?
          React.createElement(component, props) :
          <Redirect to={{
            pathname: '/login',
            state: { from: props.location }
          }} />
      )} />
    );
  }
}
// const PrivateRoute = ({ component, ...rest }) => (
//   <Route {...rest} render={props => (
//     fakeAuth.isAuthenticated ? (
//       React.createElement(component, props)
//     ) : (
//       <Redirect to={{
//         pathname: '/login',
//         state: { from: props.location }
//       }}/>
//     )
//   )}/>
// )


class Login extends React.Component<RouteComponentProps<{}>, { redirectToReferrer: Boolean }> {

  constructor(props: RouteComponentProps<{}>) {
    super(props);
    this.state = {
      redirectToReferrer: false
    };
  }

  login = () => {
    fakeAuth.authenticate(() => {
      this.setState({ redirectToReferrer: true });
    });
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return (
        <Redirect to={from} />
      );
    }

    return (
      <div>
        <p>You must log in to view the page at {from.pathname}</p>
        <button onClick={this.login}>Log in</button>
      </div>
    );
  }
}

const AuthExample = () => (
  <Router>
    <div>
      <AuthButton />
      <ul>
        <li><Link to='/public'>Public Page</Link></li>
        <li><Link to='/protected'>Protected Page</Link></li>
      </ul>
      <Route path='/public' component={Public} />
      <Route path='/login' component={Login} />
      <PrivateRoute path='/protected' component={Protected} />
    </div>
  </Router>
);

export default AuthExample;
*/


// CustomLinkExample
/*
const Home = () => <div> <h2>Home</h2> </div>;
const About = () => <div><h2>About</h2></div>;

// const OldSchoolMenuLink = ({ label, to, activeOnlyWhenExact }) => (
//   <Route path={to} exact={activeOnlyWhenExact} children={({ match }) => (
//     <div className={match ? 'active' : ''}>
//       {match ? '> ' : ''}<Link to={to}>{label}</Link>
//     </div>
//   )}/>
// )

interface OldSchoolMenuLinkProps {
  activeOnlyWhenExact?: boolean;
  to: string;
  label: string;
}
class OldSchoolMenuLink extends React.Component<OldSchoolMenuLinkProps, {}> {
  render() {
    const { activeOnlyWhenExact, to, label } = this.props;
    return (
      <Route path={to} exact={activeOnlyWhenExact} children={({ match }) => (
        <div className={match ? 'active' : ''}>
          {match ? '> ' : ''}<Link to={to}>{label}</Link>
        </div>
      )} />
    );
  }
}

const CustomLinkExample = () => (
  <Router>
    <div>
      <OldSchoolMenuLink activeOnlyWhenExact={true} to='/' label='Home' />
      <OldSchoolMenuLink to='/about' label='About' />
      <hr />
      <Route exact path='/' component={Home} />
      <Route path='/about' component={About} />
    </div>
  </Router>
);

export default CustomLinkExample;
*/

/*
import { Prompt } from 'react-router-dom';

const PreventingTransitionsExample = () => (
  <Router>
    <div>
      <ul>
        <li><Link to="/">Form</Link></li>
        <li><Link to="/one">One</Link></li>
        <li><Link to="/two">Two</Link></li>
      </ul>
      <Route path="/" exact component={Form}/>
      <Route path="/one" render={() => <h3>One</h3>}/>
      <Route path="/two" render={() => <h3>Two</h3>}/>
    </div>
  </Router>
)

class Form extends React.Component {
  state = {
    isBlocking: false
  }

  render() {
    const { isBlocking } = this.state

    return (
      <form
        onSubmit={event => {
          event.preventDefault()
          event.target.reset()
          this.setState({
            isBlocking: false
          })
        }}
      >
        <Prompt
          when={isBlocking}
          message={location => (
            `Are you sure you want to go to ${location.pathname}`
          )}
        />

        <p>
          Blocking? {isBlocking ? 'Yes, click a link or the back button' : 'Nope'}
        </p>

        <p>
          <input
            size="50"
            placeholder="type something to block transitions"
            onChange={event => {
              this.setState({
                isBlocking: event.target.value.length > 0
              })
            }}
          />
        </p>

        <p>
          <button>Submit to stop blocking</button>
        </p>
      </form>
    )
  }
}

export default PreventingTransitionsExample;
*/

// No Match(404)
/*
import {
  Switch,
  Redirect
} from 'react-router-dom'

const NoMatchExample = () => (
  <Router>
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/old-match">Old Match, to be redirected</Link></li>
        <li><Link to="/will-match">Will Match</Link></li>
        <li><Link to="/will-not-match">Will Not Match</Link></li>
        <li><Link to="/also/will/not/match">Also Will Not Match</Link></li>
      </ul>
      <Switch>
        <Route path="/" exact component={Home}/>
        <Redirect from="/old-match" to="/will-match"/>
        <Route path="/will-match" component={WillMatch}/>
        <Route component={NoMatch}/>
      </Switch>
    </div>
  </Router>
)

const Home = () => (
  <p>
    A <code>&lt;Switch></code> renders the
    first child <code>&lt;Route></code> that
    matches. A <code>&lt;Route></code> with
    no <code>path</code> always matches.
  </p>
)

const WillMatch = () => <h3>Matched!</h3>

const NoMatch = ({ location }) => (
  <div>
    <h3>No match for <code>{location.pathname}</code></h3>
  </div>
)

export default NoMatchExample
*/

const PEEPS: Array<any> = [
  { id: 0, name: 'Michelle', friends: [ 1, 2, 3 ] },
  { id: 1, name: 'Sean', friends: [ 0, 3 ] },
  { id: 2, name: 'Kim', friends: [ 0, 1, 3 ], },
  { id: 3, name: 'David', friends: [ 1, 2 ] }
]

const find = (id: number) => PEEPS.find( p => p.id === id );

const RecursiveExample = () => (
  <Router>
    <Person match={{ params: { id: 0 }, url: '' }}/>
  </Router>
)

const Person = ({ match }) => {
  console.log(match.params.id)
  const person = find(match.params.id)
  console.log(person);
  return (
    <div>
      <h3>{person.name}’s Friends</h3>
      <ul>
        {person.friends.map(id => (
          <li key={id}>
            <Link to={`${match.url}/${id}`}>
              {find(id).name}
            </Link>
          </li>
        ))}
      </ul>
      <Route path={`${match.url}/:id`} component={Person}/>
    </div>
  )
}

export default RecursiveExample