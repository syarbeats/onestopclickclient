import React,{Component,Suspense } from 'react'
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

  const DefaultFooter = React.lazy(() => import('../DefaultLayout/DefaultFooter'));
  const DefaultHeader = React.lazy(() => import('../DefaultLayout/DefaultHeader'));

class Home extends Component{
    loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>
    render(){
        return (
            <div className="app">
                <AppHeader fixed>
          <Suspense  fallback={this.loading()}>
            {/* <DefaultHeader/> */}
          </Suspense>
        </AppHeader>
        <div className="app-body">
          
          <main className="main">
            <h1>OneStopClick</h1>
          </main>
        
        </div>
                <AppFooter>
                    <Suspense fallback={this.loading()}>
                        <DefaultFooter />
                    </Suspense>
                </AppFooter>
            </div>
        )
    }
}

export default Home

