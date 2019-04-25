import React from 'react'
import {Provider} from 'react-redux'
import {BrowserRouter as Router,Route,Redirect} from 'react-router-dom'
import CartContainer from './containers/payment/CartContainer'
import ProductListContainer from './containers/payment/ProductListContainer'
import ProductDetailContainer from './containers/payment/ProductDetailContainer';
import PaymentOverviewContainer from './containers/payment/ProductOverviewContainer';
import {PrivateRouteComponent,AuthButton} from './containers/PrivateRoute';

import './App.scss';

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers
const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));

// Pages
const Login = React.lazy(() => import('./views/Pages/Login'));
const Register = React.lazy(() => import('./views/Pages/Register'));
const Page404 = React.lazy(() => import('./views/Pages/Page404'));
const Page500 = React.lazy(() => import('./views/Pages/Page500'));


const Root = ({store}) =>(
    <Provider store={store}>
  
        <Router>
            {/* <AuthButton /> */}
            <Route path="/cart" component={CartContainer} />
           {/* <Route path="/productlist" component={ProductListContainer} /> */}
         {/* <PrivateRouteComponent path="/productlist" component={ProductListContainer}/> */}
            <Route path="/product/:productId?" component={ProductDetailContainer} />
            <Route path="/paymentoverview" component={PaymentOverviewContainer} />
            <Route path="/login" component={Login}/>
            {/* <Route path="/" render={props => <DefaultLayout {...props}/>} /> */}
            {/* <PrivateRouteComponent path="/" render={props => <DefaultLayout {...props}/>} /> */}
            
        </Router>


    
    </Provider>
)

export default Root