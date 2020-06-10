import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, Redirect} from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import {AuthPage} from "./components/AuthPage";
import {ProjectsPage} from "./components/ProjectsPage";
import {createBrowserHistory} from "history";

import './index.css';

const history = createBrowserHistory();

let isAuthenticated: boolean = true;

ReactDOM.render(
    <React.StrictMode>
        <Router history={history}>
            <Route path="/auth" component={AuthPage}/>
            <Route path="/projects" render={(props) => isAuthenticated ? <ProjectsPage/> : <Redirect to="/auth" />}/>
            <Redirect from='/' to='/auth'/>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
