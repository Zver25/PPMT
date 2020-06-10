import React from 'react';
import './style.css';
import {Link} from "react-router-dom";

export interface AuthPageProps {
    
}

interface AuthPageState {
    isSignUp: boolean
}

export class AuthPage extends React.Component<AuthPageProps, AuthPageState> {
    constructor(props: AuthPageProps) {
        super(props);
        this.state = {
            isSignUp: false
        };
    }

    render(): React.ReactNode {
        const { isSignUp } = this.state;
        return (
            <div className="container">
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
                        <form className={"form-signin" + (isSignUp ? " form-signin-left" : "")} action="" method="post" name="form">
                            <label htmlFor="username">Username</label>
                            <input className="form-styling" type="text" name="username" placeholder=""/>
                            <label htmlFor="password">Password</label>
                            <input className="form-styling" type="text" name="password" placeholder=""/>
                            { /*
                            <input type="checkbox" id="checkbox"/>
                            <label htmlFor="checkbox"><span className="ui"/>Keep me signed in</label>
                            */}
                            <div className="btn-animate">
                                {/*
                                <a className="btn-signin">Sign in</a>
                                */}
                                <Link className="btn-signin" to="/projects" >Sign in</Link>
                            </div>
                        </form>
                        <form className={"form-signup" + (isSignUp ? " form-signup-left" : "")} action="" method="post" name="form">
                            <label htmlFor="fullname">Full name</label>
                            <input className="form-styling" type="text" name="fullname" placeholder=""/>
                            <label htmlFor="email">Email</label>
                            <input className="form-styling" type="text" name="email" placeholder=""/>
                            <label htmlFor="password">Password</label>
                            <input className="form-styling" type="text" name="password" placeholder=""/>
                            <label htmlFor="confirmpassword">Confirm password</label>
                            <input className="form-styling" type="text" name="confirmpassword" placeholder=""/>
                            <div className="btn-animate">
                                <a className="btn-signup">Sign Up</a>
                            </div>
                        </form>
                        <div className="success">
                            <div className="successtext">
                                <p> Thanks for signing up! Check your email for confirmation.</p>
                            </div>
                        </div>
                    </div>
                    <div className={"forgot" + (isSignUp ? " forgot-left" : "")}>
                        <a href="#">Forgot your password?</a>
                    </div>
                </div>
                { /*<a id="refresh">???</a> */}
            </div>
        );
    }

}