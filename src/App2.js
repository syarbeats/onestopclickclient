import React, { Component } from 'react';
import { HashRouter,BrowserRouter, Route, Switch } from 'react-router-dom';
import {Provider} from 'react-redux'
// import { renderRoutes } from 'react-router-config';
import './App.scss';
import {PrivateRouteComponent,AuthButton} from './containers/PrivateRoute';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import {UserRouteComponent} from './containers/UserRoute';

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// alert optional cofiguration
const options = {
  // you can also just use 'bottom center'
  position: positions.TOP_CENTER,
  timeout: 5000,
  offset: '30px',
  // you can also just use 'scale'
  //transition: transitions.SCALE,
  containerStyle: {
    zIndex: 10000
  }
}

// Containers
const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));

// Pages
const Login = React.lazy(() => import('./views/Pages/Login'));
const Register = React.lazy(() => import('./views/Pages/Register'));
const Page404 = React.lazy(() => import('./views/Pages/Page404'));
const Page500 = React.lazy(() => import('./views/Pages/Page500'));
const Home = React.lazy(() => import('./containers/home/Home'));
const DirectPage = React.lazy(() => import('./containers/admin/OAuthRedirectHandler'));
const RegisterNewUser = React.lazy(() => import('./containers/user/RegisterNewUser'));
const ForgotPassword = React.lazy(() => import('./containers/user/ForgotPassword'));
const ShopHomePage = React.lazy(() => import('./containers/shop/HomePage'));
const ProductDetailPage = React.lazy(() => import('./containers/shop/ProductDetailPage'));
const CartPage = React.lazy(() => import('./containers/shop/CartPage'));
const CheckEmail = React.lazy(() => import('./containers/user/CheckEmail'));
const ResetPassword = React.lazy(() => import('./containers/user/ResetPassword'));
const CheckoutPage = React.lazy(() => import('./containers/shop/payment/CheckoutPage'));

class App2 extends Component {

  render() {
    const {store} = this.props
    return (
      <AlertProvider template={AlertTemplate} {...options}>
      <Provider store={store}>
      <BrowserRouter>
          <React.Suspense fallback={loading()}>
            <Switch>
              <Route exact path="/" name="Home" render={props => <Home {...props}/>} />
              <Route exact path="/reset" name="Reset Password" render={props => <ResetPassword {...props}/>} />
              <Route exact path="/checkemail" name="Check Email" render={props => <CheckEmail {...props}/>} />
              <Route exact path="/shop" name="Shop" render={props => <ShopHomePage {...props}/>} />
              <Route exact path="/product/:id" name="Product Detail" render={props => <ProductDetailPage {...props}/>} />
              <Route exact path="/cart" name="Shop" render={props => <CartPage {...props}/>} />
              <Route exact path='/oauth2/redirect' name="Redirect OAUth Page" render={props => <DirectPage {...props}/>} />
              <Route exact path='/register' name="Register New User" render={() => <RegisterNewUser/>} />
              <Route exact path='/forgotPassword' name="Reset User Password" render={() => <ForgotPassword/>} />
              <Route exact path="/login" name="Login Page" render={props => <Login {...props}/>} />
              <Route exact path="/register" name="Register Page" render={props => <Register {...props}/>} />
              <Route exact path="/404" name="Page 404" render={props => <Page404 {...props}/>} />
              <Route exact path="/500" name="Page 500" render={props => <Page500 {...props}/>} />
              {/* <Route path="/" name="Home" render={props => <DefaultLayout {...props}/>} /> */}
              {/* <Route path="/adminpanel" name="Home" render={props => <DefaultLayout {...props}/>} /> */}
               {/* <PrivateRouteComponent name="Adminpanel" path="/adminpanel" render={props => <DefaultLayout {...props}/>} /> */}
               <PrivateRouteComponent name="Adminpanel" path="/adminpanel" component={props=><DefaultLayout {...props}/>} />} />
               <UserRouteComponent name="UserPages" path="/checkout" component={props=><CheckoutPage {...props}/>} />} />
            </Switch>
          </React.Suspense>
      </BrowserRouter>
      </Provider>
      </AlertProvider>
    );
  }
}

export default App2;
