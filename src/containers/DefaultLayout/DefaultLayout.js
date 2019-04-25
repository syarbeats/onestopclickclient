import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch,NavLink } from 'react-router-dom';
import { Container } from 'reactstrap';
import { authLogout } from '../../actions/auth_action';
import { connect } from 'react-redux';

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
            {/* <AppSidebarNav navConfig={navigation} {...this.props} /> */}
            <div className="sidebar">
  <nav className="sidebar-nav">
    <ul className="nav">
      {/* <li className="nav-title">Nav Title</li> */}
      <li className="nav-item">
      <NavLink to='/users' className="nav-link">
       <i className="nav-icon cui-speedometer"></i> Users
       </NavLink>
      
      </li>
      {/* <li className="nav-item">
        <a className="nav-link" href="#">
          <i className="nav-icon cui-speedometer"></i> With badge
          <span className="badge badge-primary">NEW</span>
        </a>
      </li> */}
      {/* <li class="nav-item nav-dropdown">
        <a class="nav-link nav-dropdown-toggle" href="#">
          <i class="nav-icon cui-puzzle"></i> Nav dropdown
        </a>
        <ul class="nav-dropdown-items">
          <li class="nav-item">
            <a class="nav-link" href="#">
              <i class="nav-icon cui-puzzle"></i> Nav dropdown item
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              <i class="nav-icon cui-puzzle"></i> Nav dropdown item
            </a>
          </li>
        </ul>
      </li> */}
      
    </ul>
  </nav>

</div>
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
                  <Redirect from="/" to="/dashboard" />
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

const DefaultLayout = connect()(DefaultLayoutComponent)

export default DefaultLayout;
