import React from "react";
import {connect, ConnectedProps} from "react-redux";
import {Redirect, Route} from "react-router-dom";
import {RootState} from "../../store";
import {IUserState} from "../../store/users/state";

export interface ISecureRoutePageProps {
    path: string;
    authRoute: string;
    children?: React.ReactNode;
}

interface ISecureRoutePageState {
}

interface ISecureRouteStateProps {
    user: IUserState;
}

type ISecureRoutePageAllProps = ISecureRoutePageProps & ConnectedProps<typeof connector>;

const mapStateToProps = (state: RootState): ISecureRouteStateProps => ({
    user: state.user
});

const connector = connect(mapStateToProps);

class SecureRoute extends React.Component<ISecureRoutePageAllProps, ISecureRoutePageState> {
    render(): React.ReactNode {
        const {children, path, user, authRoute} = this.props;
        return user.token !== ''
            ? <Route path={path}>{children}</Route>
            : <Redirect to={{ pathname: authRoute, state: {from: path}}}/>;
    }
}

export default connector(SecureRoute);