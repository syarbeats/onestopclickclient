import 'bootstrap/dist/css/bootstrap.css';
import 'react-app-polyfill/ie9'; // For IE 9-11 support
import 'react-app-polyfill/ie11'; // For IE 11 support
import './polyfill'
import React from 'react';
import ReactDOM,{render} from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Root from './Root'
import configureStore from './configureStore'
import App2 from './App2'

const appStore = configureStore();

// render(
//     <Root store={appStore} />,
//     document.getElementById("root")
// )

ReactDOM.render(<App2 store={appStore} />, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
