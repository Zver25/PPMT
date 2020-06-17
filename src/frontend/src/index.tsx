import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, Redirect, Switch} from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import AuthPage from "./components/AuthPage";
import DashboardPage from "./components/DashboardPage";
import {createBrowserHistory} from "history";

import store from "./store";

import './index.css';
import {Provider} from "react-redux";

const history = createBrowserHistory();

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <Router history={history}>
                <Switch>
                    <Route path="/auth" component={AuthPage}/>
                    <Route path="/projects" render={(props) =>
                        store.getState().auth.token !== null
                            ? <DashboardPage />
                            : <Redirect from="/projects" to="/auth" />
                    }/>
                    <Redirect from="/" to="/projects" exact strict />
                </Switch>
            </Router>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
