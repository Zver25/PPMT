import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import AuthPage from "../AuthPage";
import SecureRoute from "../SecureRoute";
import DashboardPage from "../DashboardPage";

import './index.css';

const authRoute = "/auth";

export default () => {
    return (
        <Router >
            <Switch>
                <Route path={authRoute} component={AuthPage}/>
                <SecureRoute path='/' authRoute={authRoute}>
                    <DashboardPage />
                </SecureRoute>
            </Switch>
        </Router>
    );
}