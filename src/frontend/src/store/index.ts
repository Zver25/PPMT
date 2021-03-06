import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";

import {AuthActionTypes, authReducer} from "./auth";
import {projectsReducer} from "./projects/reducer";
import {IProjectsActionTypes} from "./projects/actions";

const rootReducer = combineReducers({
    auth: authReducer,
    projects: projectsReducer
});

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

export type AppActions = AuthActionTypes | IProjectsActionTypes;

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export default createStore<RootState, AppActions, any, any>(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export type RootState = ReturnType<typeof  rootReducer>;

export type AppThunkAction<ReturnType = void> = ThunkAction<ReturnType, RootState, undefined, AppActions>;
export type AppThunkDispatch = ThunkDispatch<RootState, undefined, AppActions>
