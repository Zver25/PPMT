import {initialState, IUserState} from "./state";
import {
    IUserActions,
    USER_LOGIN,
    USER_LOGIN_FAILED,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT, USER_LOGOUT_SUCCESS,
    USER_REGISTRATION
} from "./actions";
import {Reducer} from "react";

export const userReducer: Reducer<IUserState, IUserActions> = (
    state: IUserState = initialState,
    action: IUserActions
) => {
    switch (action.type) {
        case USER_REGISTRATION:
            return {
                ...state,
                isSync: true
            };
        case USER_LOGIN:
            return {
                ...state,
                isSync: true
            };
        case USER_LOGIN_SUCCESS:
            return {
                ...state,
                isSync: false,
                token: action.token
            };
        case USER_LOGIN_FAILED:
            return {
                ...state,
                isSync: false
            };
        case USER_LOGOUT:
            return {
                ...state,
                isSync: true
            };
        case USER_LOGOUT_SUCCESS:
            return {
                ...state,
                token: ''
            }
        default:
            return state;
    }
}