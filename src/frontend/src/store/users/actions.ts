import { Action, ActionCreator } from "redux";
import { AxiosResponse } from "axios";
import {AppThunkAction, AppThunkDispatch} from "../index";
import UserService from "../../services/UserService";
import {SuccessAuthenticationResponse} from "../../payload/User";

export const USER_REGISTRATION = 'USER_REGISTRATION';
export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGIN_FAILED = 'USER_LOGIN_FAILED';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGOUT = 'USER_LOGOUT';
export const USER_LOGOUT_SUCCESS = 'USER_LOGOUT_SUCCESS';

interface IUserRegistrationAction extends Action {
    type: typeof USER_REGISTRATION,
    userName: string,
    fullName: string,
    password: string,
    confirmPassword: string
}

interface IUserLoginAction extends Action {
    type: typeof USER_LOGIN,
    userName: string,
    password: string
}

interface IUserLoginFailedAction extends Action {
    type: typeof USER_LOGIN_FAILED
}

interface IUserLoginSuccessAction extends Action {
    type: typeof USER_LOGIN_SUCCESS,
    token: string
}

interface IUserLogoutAction extends Action {
    type: typeof USER_LOGOUT
}

interface IUserLogoutSuccessAction extends Action {
    type: typeof USER_LOGOUT_SUCCESS
}

export type IUserActions =
    IUserRegistrationAction |
    IUserLoginAction |
    IUserLoginFailedAction |
    IUserLoginSuccessAction |
    IUserLogoutAction |
    IUserLogoutSuccessAction;

// SyncActions
export const registrationAction = (userName: string, fullName: string, password: string, confirmPassword: string): IUserRegistrationAction => ({
    type: USER_REGISTRATION,
    userName,
    fullName,
    password,
    confirmPassword
});

export const loginAction = (userName: string, password: string): IUserLoginAction => ({
    type: USER_LOGIN,
    userName,
    password
});

const loginFailedAction = (): IUserLoginFailedAction => ({
    type: USER_LOGIN_FAILED
});

const loginSuccessAction = (token: string): IUserLoginSuccessAction => ({
    type: USER_LOGIN_SUCCESS,
    token
});

const logoutAction = (): IUserLogoutAction => ({
    type: USER_LOGOUT
});

const logoutSuccess = (): IUserLogoutSuccessAction => ({
    type: USER_LOGOUT_SUCCESS
});

//Async actions

export const registrationThunkCreator: ActionCreator<AppThunkAction<IUserActions>> = (
    userName: string,
    fullName: string,
    password: string,
    confirmPassword: string
) => (dispatch: AppThunkDispatch): IUserActions => {
        UserService.registration(userName, fullName, password, confirmPassword)
            .then((response: AxiosResponse<SuccessAuthenticationResponse>) => {
                if (response.data.hasError) {
                    dispatch(loginFailedAction());
                }
                else {
                    dispatch(loginSuccessAction(response.data.data));
                }
            })
            .catch(error => {
                console.log(error);
                dispatch(loginFailedAction());
            })
        return dispatch(loginAction(userName, password));
    }

export const loginThunkCreator: ActionCreator<AppThunkAction<IUserActions>> = (userName: string, password: string) =>
    (dispatch: AppThunkDispatch): IUserActions => {
        UserService.login(userName, password)
            .then((response: AxiosResponse<SuccessAuthenticationResponse>) => {
                dispatch(loginSuccessAction(response.data.data));
            })
            .catch(error => {
                dispatch(loginFailedAction());
            })
        return dispatch(loginAction(userName, password));
    }