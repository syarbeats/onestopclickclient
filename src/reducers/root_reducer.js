import auth_reducer from './auth_reducer'
import cart from './payment_reducer'
import userReducer from './user_reducer'
import productReducer from './product_reducer'
import categoryReducer from './category_reducer'
import subCategoryReducer from './subcategory_reducer'
import permissionReducer from './permission_reducer'
import errorReducer from './error_reducer'
import roleReducer from './role_reducer'
import { combineReducers } from 'redux';

const AppReducer = combineReducers({auth_reducer,cart,userReducer,productReducer,
    permissionReducer,roleReducer,errorReducer,categoryReducer,subCategoryReducer});
export default AppReducer

