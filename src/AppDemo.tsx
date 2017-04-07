import * as React from 'react';
import {
  HashRouter as Router,
  // BrowserRouter as Router,
  Switch,
  Route,
  Link,
  RouteComponentProps
} from 'react-router-dom';

// BasicExample

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

const OldSchoolMenuLink = ({ label, to, activeOnlyWhenExact }) => (
  <Route path={to} exact={activeOnlyWhenExact} children={({ match }) => (
    <div className={match ? 'active' : ''}>
      {match ? '> ' : ''}<Link to={to}>{label}</Link>
    </div>
  )}/>
)


class BasicExample extends React.Component<{}, {}> {
  render() {
    return (
      <Router>
        <div>
          <ul>
            <OldSchoolMenuLink activeOnlyWhenExact={true} to="/" label="Home"/>
            <OldSchoolMenuLink to="/about" label="About"/>
            <OldSchoolMenuLink to="/topics" label="Topics"/>
            {/*<li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/topics">Topics</Link></li>*/}
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
export default BasicExample;

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

// RecursiveExample
/*
import { match } from 'react-router-dom';
const PEEPS: Array<any> = [
  { id: 0, name: 'Michelle', friends: [1, 2, 3] },
  { id: 1, name: 'Sean', friends: [0, 3] },
  { id: 2, name: 'Kim', friends: [0, 1, 3], },
  { id: 3, name: 'David', friends: [1, 2] }
];

const find = (id: number) => PEEPS.find(p => p.id === id);

class Person extends React.Component<{match: match<{id: string}>}, {}> {
  render(): JSX.Element {
    const { match } = this.props;
    const pID = parseInt(match.params.id) || 0;
    const person = find(pID);
    return (
      <div>
        <h3>{person.name}’s Friends</h3>
        <ul>
          {person.friends.map((id: number) => (
            <li key={id}>
              <Link to={`${match.url}/${id}`}>
                {find(id).name}
              </Link>
            </li>
          ))}
        </ul>
        <Route path={`${match.url}/:id`} component={Person} />
      </div>
    );
  }
}

// const Person = ({ match }) => {
//   console.log(match.params.id)
//   const person = find(match.params.id)
//   console.log(person);
//   return (
//     <div>
//       <h3>{person.name}’s Friends</h3>
//       <ul>
//         {person.friends.map(id => (
//           <li key={id}>
//             <Link to={`${match.url}/${id}`}>
//               {find(id).name}
//             </Link>
//           </li>
//         ))}
//       </ul>
//       <Route path={`${match.url}/:id`} component={Person}/>
//     </div>
//   )
// }


const RecursiveExample = () => (
  <Router>
    <Person match={{ params: { id: '0' }, url: '' }} />
  </Router>
);

export default RecursiveExample;
*/

/*
interface CRoute {
  path: string;
  exact?: boolean;
  sidebar(): JSX.Element;
  main(): JSX.Element;
}

const routes: CRoute[] = [
  {
    path: '/',
    exact: true,
    sidebar: () => <div>home!</div>,
    main: () => <h2>Home</h2>
  },
  {
    path: '/bubblegum',
    sidebar: () => <div>bubblegum!</div>,
    main: () => <h2>Bubblegum</h2>
  },
  {
    path: '/shoelaces',
    sidebar: () => <div>shoelaces!</div>,
    main: () => <h2>Shoelaces</h2>
  }
];

class SidebarExample extends React.Component<{}, {}> {
  render(): JSX.Element {
    return (
      <Router>
        <div style={{ display: 'flex' }}>
          <div style={{ padding: '10px', width: '40%', background: '#f0f0f0' }}>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              <li><Link to='/'>Home</Link></li>
              <li><Link to='/bubblegum'>Bubblegum</Link></li>
              <li><Link to='/shoelaces'>Shoelaces</Link></li>
            </ul>
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.sidebar}
              />
            ))}
          </div>
          <div style={{ flex: 1, padding: '10px' }}>
            {routes.map((route, index) => (
              // Render more <Route>s with the same paths as
              // above, but different components this time.
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.main}
              />
            ))}
          </div>
        </div>
      </Router>
    );
  }
}
// const SidebarExample = () => (
//   <Router>
//     <div style={{ display: 'flex' }}>
//       <div style={{
//         padding: '10px',
//         width: '40%',
//         background: '#f0f0f0'
//       }}>
//         <ul style={{ listStyleType: 'none', padding: 0 }}>
//           <li><Link to='/'>Home</Link></li>
//           <li><Link to='/bubblegum'>Bubblegum</Link></li>
//           <li><Link to='/shoelaces'>Shoelaces</Link></li>
//         </ul>

//         {routes.map((route, index) => (
//           // You can render a <Route> in as many places
//           // as you want in your app. It will render along
//           // with any other <Route>s that also match the URL.
//           // So, a sidebar or breadcrumbs or anything else
//           // that requires you to render multiple things
//           // in multiple places at the same URL is nothing
//           // more than multiple <Route>s.
//           <Route
//             key={index}
//             path={route.path}
//             exact={route.exact}
//             component={route.sidebar}
//           />
//         ))}
//       </div>

//       <div style={{ flex: 1, padding: '10px' }}>
//         {routes.map((route, index) => (
//           // Render more <Route>s with the same paths as
//           // above, but different components this time.
//           <Route
//             key={index}
//             path={route.path}
//             exact={route.exact}
//             component={route.main}
//           />
//         ))}
//       </div>
//     </div>
//   </Router>
// )

export default SidebarExample;
*/

/*
import { Switch } from 'react-router-dom';

const AmbiguousExample = () => (
  <Router>
    <div>
      <ul>
        <li><Link to='/about'>About Us (static)</Link></li>
        <li><Link to='/company'>Company (static)</Link></li>
        <li><Link to='/kim'>Kim (dynamic)</Link></li>
        <li><Link to='/chris'>Chris (dynamic)</Link></li>
      </ul>

      {/*
          Sometimes you want to have a whitelist of static paths
          like "/about" and "/company" but also allow for dynamic
          patterns like "/:user". The problem is that "/about"
          is ambiguous and will match both "/about" and "/:user".
          Most routers have an algorithm to decide for you what
          it will match since they only allow you to match one
          "route". React Router lets you match in multiple places
          on purpose (sidebars, breadcrumbs, etc). So, when you
          want to clear up any ambiguous matching, and not match
          "/about" to "/:user", just wrap your <Route>s in a
          <Switch>. It will render the first one that matches.
      }
      <Switch>
        <Route path='/about' component={About} />
        <Route path='/company' component={Company} />
        <Route path='/:user' component={User} />
      </Switch>
    </div>
  </Router>
)

const About = () => <h2>About</h2>;
const Company = () => <h2>Company</h2>;
const User = ({ match }) => (
  <div>
    <h2>User: {match.params.user}</h2>
  </div>
)

export default AmbiguousExample
*/

// Some folks find value in a centralized route config.
// A route config is just data. React is great at mapping
// data into components, and <Route> is a component.

////////////////////////////////////////////////////////////
// first our route components
/*
interface CRoute {
  path: string;
  component: React.ComponentClass<any> | React.SFC<any>;
  routes?: CRoute[];
}
const Main = () => 'Main';
const Bus = () => <h3>Bus</h3>;
const Cart = () => <h3>Cart</h3>;
const Sandwiches = () => <h2>Sandwiches</h2>;

// const Tacos = ({ routes }) => (
//   <div>
//     <h2>Tacos</h2>
//     <ul>
//       <li><Link to="/tacos/bus">Bus</Link></li>
//       <li><Link to="/tacos/cart">Cart</Link></li>
//     </ul>

//     {routes.map((route, i) => (
//       <RouteWithSubRoutes key={i} {...route} />
//     ))}
//   </div>
// )

class Tacos extends React.Component<{ routes: CRoute[] }, {}> {
  render(): JSX.Element {
    const { routes } = this.props;
    return (
      <div>
        <h2>Tacos</h2>
        <ul>
          <li><Link to='/tacos/bus'>Bus</Link></li>
          <li><Link to='/tacos/cart'>Cart</Link></li>
        </ul>

        {routes.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route} />
        ))}
      </div>
    );
  }
}

////////////////////////////////////////////////////////////
// then our route config
const routes: CRoute[] = [
  {
    path: '/sandwiches',
    component: Sandwiches
  },
  {
    path: '/tacos',
    component: Tacos,
    routes: [
      {
        path: '/tacos/bus',
        component: Bus
      },
      {
        path: '/tacos/cart',
        component: Cart
      }
    ]
  }
]

// wrap <Route> and use this everywhere instead, then when
// sub routes are added to any route it'll work
// const RouteWithSubRoutes = (route) => (
// <Route path={route.path} render={props => (
// pass the sub-routes down to keep nesting
// <route.component {...props} routes={route.routes}/>
// )}/>
// )
class RouteWithSubRoutes extends React.Component<CRoute & { key: number }, {}> {
  render() {
    const route = this.props;
    return (
      <Route path={route.path} render={props => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes} />
      )} />
    );
  }
}

const RouteConfigExample = () => (
  <Router>
    <div>
      <ul>
        <li><Link to='/tacos'>Tacos</Link></li>
        <li><Link to='/sandwiches'>Sandwiches</Link></li>
      </ul>

      {routes.map((route, i) => (
        <RouteWithSubRoutes key={i} {...route} />
      ))}
    </div>
  </Router>
);

export default RouteConfigExample;
*/


// Modal Gallery
/*
import { PartialRouteComponentProps } from 'react-router-dom';
class ModalSwitch extends React.Component<PartialRouteComponentProps<{}>, {}> {

  // We can pass a location to <Switch/> that will tell it to
  // ignore the router's current location and use the location
  // prop instead.
  //
  // We can also use "location state" to tell the app the user
  // wants to go to `/images/2` in a modal, rather than as the
  // main page, keeping the gallery visible behind it.
  //
  // Normally, `/images/2` wouldn't match the gallery at `/`.
  // So, to get both screens to render, we can save the old
  // location and pass it to Switch, so it will think the location
  // is still `/` even though its `/images/2`.
  previousLocation = this.props.location;

  componentWillUpdate(nextProps: PartialRouteComponentProps<{}>) {
    const { location } = this.props;
    // console.log('location', location);
    // set previousLocation if props.location is not modal
    // console.log(nextProps.history.action, location.state);
    if (
      nextProps.history.action !== 'POP' &&
      (!location.state || !location.state.modal)
    ) {
      this.previousLocation = this.props.location;
    }
  }

  render() {
    const { location } = this.props;
    const isModal = !!(
      location.state &&
      location.state.modal &&
      this.previousLocation !== location // not initial render
    );
    // console.log(isModal, this.previousLocation, location);
    return (
      <div>
        <Switch location={isModal ? this.previousLocation : location}>
          <Route exact path='/' component={Home} />
          <Route path='/gallery' component={Gallery} />
          <Route path='/img/:id' component={ImageView} />
        </Switch>
        {isModal ? <Route path='/img/:id' component={Modal} /> : null}
      </div>
    );
  }
}

const IMAGES = [
  { id: 0, title: 'Dark Orchid', color: 'DarkOrchid' },
  { id: 1, title: 'Lime Green', color: 'LimeGreen' },
  { id: 2, title: 'Tomato', color: 'Tomato' },
  { id: 3, title: 'Seven Ate Nine', color: '#789' },
  { id: 4, title: 'Crimson', color: 'Crimson' }
];

class Thumbnail extends React.Component<{ color: string }, {}> {
  render() {
    const { color } = this.props;
    return (
      <div style={{
        width: 50,
        height: 50,
        background: color
      }} />
    );
  }
}

class Image extends React.Component<{ color: string }, {}> {
  render() {
    const { color } = this.props;
    return (
      <div style={{
        width: '100%',
        height: 400,
        background: color
      }}></div>
    );
  }
}


const Home = () => (
  <div>
    <Link to='/gallery'>Visit the Gallery</Link>
    <h2>Featured Images</h2>
    <ul>
      <li><Link to='/img/2'>Tomato</Link></li>
      <li><Link to='/img/4'>Crimson</Link></li>
    </ul>
  </div>
);

const Gallery = () => (
  <div>
    {IMAGES.map(i => (
      <Link
        key={i.id}
        to={{
          pathname: `/img/${i.id}`,
          // this is the trick!
          state: { modal: true }
        }}
      >
        <Thumbnail color={i.color} />
        <p>{i.title}</p>
      </Link>
    ))}
  </div>
);

class ImageView extends React.Component<RouteComponentProps<{ id: string }>, {}> {
  render() {
    const { match } = this.props;
    const image = IMAGES[parseInt(match.params.id, 10)];
    if (!image) {
      return <div>Image not found</div>;
    }

    return (
      <div>
        <h1>{image.title}</h1>
        <Image color={image.color} />
      </div>
    );
  }
}


class Modal extends React.Component<RouteComponentProps<{ id: string }>, {}> {
  render() {
    const { match , history } = this.props;
    const image = IMAGES[parseInt(match.params.id, 10)];
    if (!image) {
      return null;
    }
    const back = (e: React.MouseEvent<HTMLElement>) => {
      e.stopPropagation();
      history.goBack();
    };
    return (
      <div
        onClick={back}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          background: 'rgba(0, 0, 0, 0.15)'
        }}
      >
        <div className='modal' style={{
          position: 'absolute',
          background: '#fff',
          top: 25,
          left: '10%',
          right: '10%',
          padding: 15,
          border: '2px solid #444'
        }}>
          <h1>{image.title}</h1>
          <Image color={image.color} />
          <button type='button' onClick={back}>
            Close
        </button>
        </div>
      </div>
    );
  }
}
/*
const Modal = ({ match, history }) => {
  const image = IMAGES[parseInt(match.params.id, 10)]
  if (!image) {
    return null
  }
  const back = (e) => {
    e.stopPropagation()
    history.goBack()
  }
  return (
    <div
      onClick={back}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        background: 'rgba(0, 0, 0, 0.15)'
      }}
    >
      <div className='modal' style={{
        position: 'absolute',
        background: '#fff',
        top: 25,
        left: '10%',
        right: '10%',
        padding: 15,
        border: '2px solid #444'
      }}>
        <h1>{image.title}</h1>
        <Image color={image.color} />
        <button type='button' onClick={back}>
          Close
        </button>
      </div>
    </div>
  )
}
*/
/*
const ModalGallery = () => (
  <Router>
    <Route component={ModalSwitch} />
  </Router>
);

export default ModalGallery;
*/