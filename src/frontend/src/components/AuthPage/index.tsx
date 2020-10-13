import React, {ChangeEvent, MouseEvent} from 'react';
import {connect} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import { Redirect, RouteComponentProps } from 'react-router-dom';

import './style.css';
import {RootState} from "../../store";
import {IUserState} from "../../store/users/state";
import {loginThunkCreator, registrationThunkCreator} from "../../store/users/actions";

interface AuthPageState {
    isSignUp: boolean;
    username: string;
    fullname: string;
    password: string;
    confirmPassword: string;
}

interface AuthPageDispatchProps {
    login: (username: string, password: string) => void;
    registration: (username: string, fullname: string, password: string, confirmPassword: string) => void;
}

interface AuthPageStateProps {
    user: IUserState,
}

const mapStateToProps = (state: RootState): AuthPageStateProps => ({
    user: state.user,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, any>): AuthPageDispatchProps => ({
    login: async (username: string, password: string) => {
        await dispatch(loginThunkCreator(username, password));
    },
    registration: async (username: string, fullname: string, password: string, confirmPassword: string) =>
        await dispatch(registrationThunkCreator(username, fullname, password, confirmPassword))
});

type TState = {from: string} | null;

const connector = connect(mapStateToProps, mapDispatchToProps);

type AuthPageAllProps = RouteComponentProps & AuthPageStateProps & AuthPageDispatchProps;

class AuthPage extends React.Component<AuthPageAllProps, AuthPageState> {
    constructor(props: AuthPageAllProps) {
        super(props);
        this.state = {
            isSignUp: false,
            username: '',
            fullname: '',
            password: '',
            confirmPassword: ''
        };
    }

    handleChangeUsername = (e: ChangeEvent<HTMLInputElement>): void => {
        this.setState({username: e.target.value});
    }

    handleChangeFullname = (e: ChangeEvent<HTMLInputElement>): void => {
        this.setState({fullname: e.target.value});
    }

    handleChangePassword = (e: ChangeEvent<HTMLInputElement>): void => {
        this.setState({password: e.target.value});
    }

    handleChangeConfirmPassword = (e: ChangeEvent<HTMLInputElement>): void => {
        this.setState({confirmPassword: e.target.value});
    }

    handleLogin = (event: MouseEvent<HTMLButtonElement>): void => {
        const {username, password} = this.state;
        this.props.login(username, password);
        event.preventDefault();
    }

    handleRegistration = (event: MouseEvent<HTMLButtonElement>): void => {
        const {username, fullname, password, confirmPassword} = this.state;
        this.props.registration(username, fullname, password, confirmPassword);
        event.preventDefault();
    }

    render(): React.ReactNode {
        const { isSignUp, username, fullname, password, confirmPassword } = this.state;
        if (this.props.user.token !== '') {
            const state: TState = (this.props.location.state as TState);
            const location = state != null ? state.from : '/';
            return <Redirect to={location} />;
        }
        return (
            <div className="main-container container">
                <div className={"frame" + (isSignUp ? " frame-long" : "")}>
                    <div className="nav">
                        <ul className="links">
                            <li className={ isSignUp ? "signin-inactive" : "signin-active" }>
                                <span className="btn" onClick={() => this.setState({isSignUp: false})}>Sign in</span>
                            </li>
                            <li className={ isSignUp ? "signup-active" : "signup-inactive"}>
                                <span className="btn" onClick={() => this.setState({isSignUp: true})}>Sign up </span>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <form className={"form-signin" + (isSignUp ? " form-signin-left" : "")}>
                            <label htmlFor="username">E-mail</label>
                            <input className="form-styling" type="text" name="username"
                                   value={username} onChange={this.handleChangeUsername}/>
                            <label htmlFor="password">Password</label>
                            <input className="form-styling" type="password" name="password"
                                   value={password} onChange={this.handleChangePassword}/>
                            { /*
                            <input type="checkbox" id="checkbox"/>
                            <label htmlFor="checkbox"><span className="ui"/>Keep me signed in</label>
                            */}
                            <button className="btn-animate btn-signin" onClick={this.handleLogin}>Sign In</button>
                        </form>
                        <form className={"form-signup" + (isSignUp ? " form-signup-left" : "")} action="" method="post" name="form">
                            <label htmlFor="fullname">Full name</label>
                            <input className="form-styling" type="text" name="fullname"
                                   value={fullname} onChange={this.handleChangeFullname}/>
                            <label htmlFor="email">E-mail</label>
                            <input className="form-styling" type="text" name="email"
                                   value={username} onChange={this.handleChangeUsername}/>
                            <label htmlFor="password">Password</label>
                            <input className="form-styling" type="password" name="password"
                                   value={password} onChange={this.handleChangePassword}/>
                            <label htmlFor="confirmpassword">Confirm password</label>
                            <input className="form-styling" type="password" name="confirmpassword"
                                   value={confirmPassword} onChange={this.handleChangeConfirmPassword}/>
                            <button className="btn-animate btn-signin" onClick={this.handleRegistration}>Sign Up</button>
                        </form>
                    </div>
                    {/*
                    <div className={"forgot" + (isSignUp ? " forgot-left" : "")}>
                        <a href="#">Forgot your password?</a>
                    </div>
                    */}
                </div>
                { /*<a id="refresh">???</a> */}
            </div>
        );
    }

}

export default connector(AuthPage);