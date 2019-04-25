import React from 'react';

const Dashboard = React.lazy(() => import('./views/Dashboard'));

// const Users = React.lazy(() => import('./views/Users/Users'));
// const User = React.lazy(() => import('./views/Users/User'));

const Users = React.lazy(() => import('./containers/user/Tables'));
const UserForm = React.lazy(() => import('./containers/user/Forms'));


const routes = [
  //  { path: '/adminpanel/das', exact: true, name: 'Home' },
  { path: '/adminpanel/dashboard', name: 'Dashboard', component: Dashboard },
  // { path: '/', exact: true, name: 'Home' },
  // { path: '/dashboard', name: 'Dashboard', component: Dashboard },
 // { path: '/users', exact: true,  name: 'Users', component: Users },
 // { path: '/users/:id', exact: true, name: 'User Details', component: User },
 { path: '/adminpanel/users', exact: true,  name: 'Users', component: Users },
 { path: '/adminpanel/users/add', exact: true,  name: 'UsersForm', component: UserForm },
 { path: '/adminpanel/users/edit/:id', exact: true,  name: 'UsersForm', component: UserForm },
];

export default routes;
