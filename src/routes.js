import React from 'react';
import {ADMIN_PATH} from './config/Config'

const Dashboard = React.lazy(() => import('./views/Dashboard'));

// const Users = React.lazy(() => import('./views/Users/Users'));
// const User = React.lazy(() => import('./views/Users/User'));

const Users = React.lazy(() => import('./containers/user/Tables'));
const UserForm = React.lazy(() => import('./containers/user/Forms'));

const ProductTable = React.lazy(() => import('./containers/product/Tables'));
const ProductForm = React.lazy(() => import('./containers/product/Forms'));



const routes = [
  //  { path: '/adminpanel/das', exact: true, name: 'Home' },
  { path: ADMIN_PATH+'/dashboard', name: 'Dashboard', component: Dashboard },
  // { path: '/', exact: true, name: 'Home' },
  // { path: '/dashboard', name: 'Dashboard', component: Dashboard },
 // { path: '/users', exact: true,  name: 'Users', component: Users },
 // { path: '/users/:id', exact: true, name: 'User Details', component: User },
 { path: ADMIN_PATH+'/users', exact: true,  name: 'Users', component: Users },
 { path: ADMIN_PATH+'/users/add', exact: true,  name: 'UsersForm', component: UserForm },
 { path: ADMIN_PATH+'/users/edit/:id', exact: true,  name: 'UsersForm', component: UserForm },
 { path: ADMIN_PATH+'/product', exact: true,  name: 'Products', component: ProductTable },
 { path: ADMIN_PATH+'/product/add', exact: true,  name: 'Add Product', component: ProductForm },
 { path: ADMIN_PATH+'/product/edit/:id', exact: true,  name: 'Edit Product', component: ProductForm },
];

export default routes;
