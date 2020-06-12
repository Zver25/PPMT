import {combineReducers, createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import {AuthActionTypes, authReducer} from "./auth";

const rootReducer = combineReducers({
    auth: authReducer
});

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export default createStore<RootState, AllActions, any, any>(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export type RootState = ReturnType<typeof  rootReducer>;

export type AllActions = AuthActionTypes;
