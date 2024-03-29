import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch,NavLink } from 'react-router-dom';
import { Container } from 'reactstrap';
import { authLogout } from '../../actions/auth_action';
import { connect } from 'react-redux';
import {ADMIN_PATH} from '../../config/Config'

import {
  AppAside,
  AppBreadcrumb,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
import navigation from '../../_nav';
// routes config
import routes from '../../routes';
import {fakeAuth} from '../../containers/PrivateRoute'

const DefaultAside = React.lazy(() => import('./DefaultAside'));
const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));

class DefaultLayoutComponent extends Component {

  constructor(props){
    super(props)
    this.signOut = this.signOut.bind(this)
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  signOut(e) {
    e.preventDefault()
    const {dispatch} = this.props
    localStorage.setItem("token","")
    fakeAuth.isAuthenticated = false
    dispatch(authLogout())
    this.props.history.push('/login')
  }

  componentWillReceiveProps(prevProps) {
    console.log(prevProps)
    if(prevProps.receiveResponse500){
      alert("Hello")
    }
    
  }

  testAClick(e){
    e.preventDefault();
  }

  render() {

  
    return (
      <div className="app">
        <AppHeader fixed>
          <Suspense  fallback={this.loading()}>
            <DefaultHeader onLogout={e=>this.signOut(e)}/>
          </Suspense>
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <Suspense>
            <AppSidebarNav navConfig={navigation} {...this.props} />
            
            </Suspense>
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            <AppBreadcrumb appRoutes={routes}/>
            <Container fluid>
              <Suspense fallback={this.loading()}>
                <Switch>
                  {routes.map((route, idx) => {
                    return route.component ? (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={props => (
                          <route.component {...props} />
                        )} />
                    ) : (null);
                  })}
                  <Redirect from="/" to={ADMIN_PATH+"/dashboard"} />
                </Switch>
              </Suspense>
            </Container>
          </main>
          <AppAside fixed>
            <Suspense fallback={this.loading()}>
              <DefaultAside />
            </Suspense>
          </AppAside>
        </div>
        <AppFooter>
          <Suspense fallback={this.loading()}>
            <DefaultFooter />
          </Suspense>
        </AppFooter>
      </div>
    );
  }
}

function mapStateToProps(state){
    return {
       receiveResponse500:state.errorReducer.receivedResponse500
    }
}

const DefaultLayout = connect(mapStateToProps)(DefaultLayoutComponent)

export default DefaultLayout;
