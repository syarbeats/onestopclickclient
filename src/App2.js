import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import {Provider} from 'react-redux'
// import { renderRoutes } from 'react-router-config';
import './App.scss';
import {PrivateRouteComponent,AuthButton} from './containers/PrivateRoute';

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers
const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));

// Pages
const Login = React.lazy(() => import('./views/Pages/Login'));
const Register = React.lazy(() => import('./views/Pages/Register'));
const Page404 = React.lazy(() => import('./views/Pages/Page404'));
const Page500 = React.lazy(() => import('./views/Pages/Page500'));
const Home = React.lazy(() => import('./containers/home/Home'));

class App2 extends Component {

  render() {
    const {store} = this.props
    return (
      <Provider store={store}>
      <HashRouter>
          <React.Suspense fallback={loading()}>
            <Switch>
              <Route exact path="/" name="Home" render={props => <Home {...props}/>} />
              <Route exact path="/login" name="Login Page" render={props => <Login {...props}/>} />
              <Route exact path="/register" name="Register Page" render={props => <Register {...props}/>} />
              <Route exact path="/404" name="Page 404" render={props => <Page404 {...props}/>} />
              <Route exact path="/500" name="Page 500" render={props => <Page500 {...props}/>} />
              {/* <Route path="/" name="Home" render={props => <DefaultLayout {...props}/>} /> */}
              {/* <Route path="/adminpanel" name="Home" render={props => <DefaultLayout {...props}/>} /> */}
               {/* <PrivateRouteComponent name="Adminpanel" path="/adminpanel" render={props => <DefaultLayout {...props}/>} /> */}
               <PrivateRouteComponent name="Adminpanel" path="/adminpanel" component={props=><DefaultLayout {...props}/>} />} />
            </Switch>
          </React.Suspense>
      </HashRouter>
      </Provider>
    );
  }
}

export default App2;
