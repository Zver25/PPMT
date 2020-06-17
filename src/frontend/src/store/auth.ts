import {Action, ActionCreator, Reducer} from 'redux';
import axios, {AxiosResponse} from "axios";

import {rootUrl} from "./rootUrl";
import {AppThunkAction, AppThunkDispatch} from "./index";

const AUTH_SET_SYNC = 'AUTH_SET_SYNC';
const LOGIN = 'LOGIN';
const REGISTRATION = 'REGISTRATION';
const AUTH_SET_TOKEN = 'AUTH_SET_TOKEN';

export interface AuthState {
    isSync: boolean;
    error?: string;
    username?: string;
    token: string | null;
    fullname?: string;
}

const initialState: AuthState = {
    isSync: false,
    token: null
}

interface LoginAction extends Action {
    type: typeof LOGIN;
    username: string;
    password: string;
}

interface SetSyncAction extends Action {
    type: typeof AUTH_SET_SYNC;
    isSync: boolean;
}

interface RegistrationAction extends Action {
    type: typeof REGISTRATION;
    username: string;
    fullname: string;
    password: string;
    confirmPassword: string;
}

interface LoginSuccessResponse extends Action {
    status: boolean;
    token: string;
}

interface SetTokenAction extends Action {
    type: typeof AUTH_SET_TOKEN;
    token: string
}

const setSyncAction = (isSync: boolean): SetSyncAction => ({ type: AUTH_SET_SYNC, isSync });

const setTokenAction = (token: string): SetTokenAction => ({ type: AUTH_SET_TOKEN, token });

export type AuthActionTypes = LoginAction | RegistrationAction | SetSyncAction | SetTokenAction;

export const loginAction: ActionCreator<AppThunkAction<AuthActionTypes>> = (
    username: string,
    password: string
) => (dispatch: AppThunkDispatch): AuthActionTypes => {
    axios.post<LoginSuccessResponse>(rootUrl + '/users/login', {username, password})
        .then((response: AxiosResponse<LoginSuccessResponse>) => {
            dispatch(setSyncAction(false));
            dispatch(setTokenAction(response.data.token));
        })
        .catch(x => {
            // @TO-DO: Dispatch error
            dispatch(setSyncAction(false));
        });
    return setSyncAction(true);
}

export const registrationAction: ActionCreator<AppThunkAction<AuthActionTypes>> = (
    username: string,
    fullname: string,
    password: string,
    confirmPassword: string
) => (dispatch: AppThunkDispatch): AuthActionTypes => {
    axios.post<LoginSuccessResponse>(rootUrl + '/users/registration', {username, fullname, password, confirmPassword})
        .then((response: AxiosResponse<LoginSuccessResponse>) => {
            dispatch(setSyncAction(false));
            dispatch(setTokenAction(response.data.token));
        })
        .catch(x => {
            // @TO-DO: Dispatch error
            dispatch(setSyncAction(false));
        });
    return setSyncAction(true);
}

export const authReducer: Reducer<AuthState, AuthActionTypes> = (state: AuthState = initialState, action: AuthActionTypes): AuthState => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state
            };
        case REGISTRATION:
            return {
                ...state
            };
        case AUTH_SET_SYNC:
            return {
                ...state,
                isSync: action.isSync
            }
        case AUTH_SET_TOKEN:
            return {
                ...state,
                token: action.token
            }
        default:
            return state;
    }
}

