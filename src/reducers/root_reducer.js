import auth_reducer from './auth_reducer'
import cart from './payment_reducer'
import userReducer from './user_reducer'
import productReducer from './product_reducer'
import { combineReducers } from 'redux';

const AppReducer = combineReducers({auth_reducer,cart,userReducer,productReducer});
export default AppReducer

