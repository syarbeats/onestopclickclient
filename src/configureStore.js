import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import AppReducer from './reducers/root_reducer'

const loggerMiddleware = createLogger()

export default function configureStore(preloadedState) {
  return createStore(
    AppReducer,
    preloadedState,
    applyMiddleware(thunkMiddleware, loggerMiddleware)
  )
}