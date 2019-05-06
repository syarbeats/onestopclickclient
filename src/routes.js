import React from 'react';
import {ADMIN_PATH} from './config/Config'

const Dashboard = React.lazy(() => import('./views/Dashboard'));

// const Users = React.lazy(() => import('./views/Users/Users'));
// const User = React.lazy(() => import('./views/Users/User'));

/*const Users = React.lazy(() => import('./containers/user/Tables'));*/
const Users = React.lazy(() => import('./containers/user/UserList'));
const UserForm = React.lazy(() => import('./containers/user/Forms'));
const UserEdit = React.lazy(() => import('./containers/user/UserEdit'));

/*const UserEdit = React.lazy(() => import('./containers/user/edit_user'));*/

const ProductTable = React.lazy(() => import('./containers/product/Tables'));
const ProductForm = React.lazy(() => import('./containers/product/Forms'));
const CategoriesTable = React.lazy(() => import('./containers/product/CategoriesTable'));

const PermissionTable = React.lazy(() => import('./containers/permission/Tables'));
const PermissionForm = React.lazy(() => import('./containers/permission/Forms'));

const RoleTable = React.lazy(() => import('./containers/role/Tables'));
const RoleForm = React.lazy(() => import('./containers/role/Forms'));
const PermissionsTable = React.lazy(() => import('./containers/role/PermissionsTable'));

const UserRolesTable = React.lazy(() => import('./containers/user/UserRolesTable'));

const CategoryTable = React.lazy(() => import('./containers/category/Tables'));
const CategoryForm = React.lazy(() => import('./containers/category/Forms'));

const SubCategoryTable = React.lazy(() => import('./containers/subcategory/Tables'));
const SubCategoryForm = React.lazy(() => import('./containers/subcategory/Forms'));

const EventListForm = React.lazy(() => import('./containers/admin/event'));
const HttpTraceListForm = React.lazy(() => import('./containers/admin/http_trace'));
const TokenListForm = React.lazy(() => import('./containers/admin/token_list'));
const ActivityListForm = React.lazy(() => import('./containers/admin/activity_list'));


const routes = [
  //  { path: '/adminpanel/das', exact: true, name: 'Home' },
  { path: ADMIN_PATH+'/dashboard', name: 'Dashboard', component: Dashboard },
  // { path: '/', exact: true, name: 'Home' },
  // { path: '/dashboard', name: 'Dashboard', component: Dashboard },
 // { path: '/users', exact: true,  name: 'Users', component: Users },
 // { path: '/users/:id', exact: true, name: 'User Details', component: User },
 { path: ADMIN_PATH+'/users', exact: true,  name: 'Users', component: Users },
 { path: ADMIN_PATH+'/users/add', exact: true,  name: 'UsersForm', component: UserForm },
 { path: ADMIN_PATH+'/users/edit/:id', exact: true,  name: 'UsersForm', component: UserEdit },
 { path: ADMIN_PATH+'/users/roles/:id', exact: true,  name: 'Manage Roles', component: UserRolesTable },
/*  { path: ADMIN_PATH+'/users/user/edit/:id', exact: true,  name: 'UsersForm', component: UserEdit },*/
 { path: ADMIN_PATH+'/product', exact: true,  name: 'Products', component: ProductTable },
 { path: ADMIN_PATH+'/product/add', exact: true,  name: 'Add Product', component: ProductForm },
 { path: ADMIN_PATH+'/product/edit/:id', exact: true,  name: 'Edit Product', component: ProductForm },
 { path: ADMIN_PATH+'/product/:id/categories', exact: true,  name: 'Manage Categories', component: CategoriesTable },
 { path: ADMIN_PATH+'/permission', exact: true,  name: 'Permissions', component: PermissionTable },
 { path: ADMIN_PATH+'/permission/add', exact: true,  name: 'Add Permission', component: PermissionForm },
 { path: ADMIN_PATH+'/permission/edit/:id', exact: true,  name: 'Edit Permission', component: PermissionForm },
 { path: ADMIN_PATH+'/role', exact: true,  name: 'Roles', component: RoleTable },
 { path: ADMIN_PATH+'/role/add', exact: true,  name: 'Add Role', component: RoleForm },
 { path: ADMIN_PATH+'/role/edit/:id', exact: true,  name: 'Edit Role', component: RoleForm },
 { path: ADMIN_PATH+'/role/:id/permissions', exact: true,  name: 'Manage Permissions', component: PermissionsTable },
 { path: ADMIN_PATH+'/category', exact: true,  name: 'Categories', component: CategoryTable },
 { path: ADMIN_PATH+'/category/add', exact: true,  name: 'Add Category', component: CategoryForm },
 { path: ADMIN_PATH+'/category/edit/:id', exact: true,  name: 'Edit Category', component: CategoryForm },
 { path: ADMIN_PATH+'/subcategory', exact: true,  name: 'Sub Categories', component: SubCategoryTable },
 { path: ADMIN_PATH+'/subcategory/add', exact: true,  name: 'Add Sub Category', component: SubCategoryForm },
 { path: ADMIN_PATH+'/subcategory/edit/:id', exact: true,  name: 'Edit Sub Category', component: SubCategoryForm },

  { path: ADMIN_PATH+'/admin/event', exact: true,  name: 'Event', component: EventListForm },
  { path: ADMIN_PATH+'/admin/httptrace', exact: true,  name: 'HTTP Trace', component: HttpTraceListForm },
  { path: ADMIN_PATH+'/admin/tokenList', exact: true,  name: 'Token List', component: TokenListForm },
  { path: ADMIN_PATH+'/admin/activityList/:id', exact: true,  name: 'Token List', component: ActivityListForm },
];

export default routes;
