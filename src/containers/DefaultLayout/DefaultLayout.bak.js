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
            {/* <AppSidebarNav navConfig={navigation} {...this.props} /> */}
            <div className="sidebar">
  <nav className="sidebar-nav">
    <ul className="nav">
     
      <li className="nav-item">
      <NavLink to={ADMIN_PATH+"/users"} className="nav-link">
       <i className="nav-icon cui-file"></i> Users
       </NavLink>
      
      </li>
      <li className="nav-item">
      <NavLink to={ADMIN_PATH+'/category'} className="nav-link">
       <i className="nav-icon cui-file"></i> Category Management
       </NavLink>
      
      </li>
      <li className="nav-item">
      <NavLink to={ADMIN_PATH+'/subcategory'} className="nav-link">
       <i className="nav-icon cui-file"></i> Sub Category Management
       </NavLink>
      
      </li>
      <li className="nav-item">
      <NavLink to={ADMIN_PATH+'/product'} className="nav-link">
       <i className="nav-icon cui-file"></i> Product Management
       </NavLink>
      
      </li>
      {/* <li className="nav-item">
      <NavLink to={ADMIN_PATH+'/permission'} className="nav-link">
       <i className="nav-icon cui-file"></i> Permission Management
       </NavLink>
      
      </li> */}
      <li className="nav-item">
      <NavLink to={ADMIN_PATH+'/role'} className="nav-link">
        <i className="nav-icon cui-file"></i> Role Management
      </NavLink>

    </li>

{/* // test  */}
     <li className="nav-item nav-dropdown">
        <a className="nav-link nav-dropdown-toggle">
          <i className="nav-icon cui-puzzle"></i> Nav dropdown
        </a>
        <ul className="nav-dropdown-items">
          <li className="nav-item">
            <a className="nav-link" href="#">
              <i className="nav-icon cui-puzzle"></i> Nav dropdown item
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              <i className="nav-icon cui-puzzle"></i> Nav dropdown item
            </a>
          </li>
        </ul>
      </li>
{/* // test  */}

      <li className="nav-item">
        <NavLink to={ADMIN_PATH+'/dashboard'} className="nav-link">
          <i className="nav-icon cui-file"></i> Admin Monitoring
          <li className="nav-item">
            <NavLink to={ADMIN_PATH+'/admin/event'} className="nav-link">
              <i className="nav-icon cui-file"></i> Event
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to={ADMIN_PATH+'/admin/httptrace'} className="nav-link">
              <i className="nav-icon cui-file"></i> HTTP Trace
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to={ADMIN_PATH+'/admin/tokenList'} className="nav-link">
              <i className="nav-icon cui-file"></i> Token List
            </NavLink>
          </li>
        </NavLink>
      </li>

      
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
