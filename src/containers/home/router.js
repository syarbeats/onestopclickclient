import React from 'react' ;
import { BrowserRouter as Router, Route } from "react-router-dom";
import Index from './Index';
import ListUser from '../../containers/user/Tables';


function AppRouter() {
    return (
        <Router>
            <div>
                <Route path="/" exact component = {Index} />
                <Route path="/adminpanel/dashboard" exact component = { ListUser } />
            </div>
        </Router>
    );
}

export default AppRouter;
