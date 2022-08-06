import React from "react";
import { HashRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import AuthService from "./services/Auth";
import { BaseLayoutScreen } from "./components/template/BaseLayout";
import { LoginPage, NoMatchPage} from './pages/Login';
import { HomePage } from "./pages/HomePage";
import { UsersEdit, UsersAdd, UsersAll, PasswordEdit, UserView } from "./pages/Users";
import { SignIn } from "./pages/SignIn";

const Auth = new AuthService();

/*----------------------------------------------------------------------------------------------------*/

function PrivateRoute({ component: Component, ...rest }) 
{
	return (
		<Route {...rest} render={	
				props =>
					Auth.loggedIn() ? 
					( <Component {...props} /> ) : 
					( <Redirect to={{ pathname: "/login", state: { from: props.location } }} /> )
			}
		/>
	);
}

/*----------------------------------------------------------------------------------------------------*/

function Routes()
{
    return (
        <Router>
            <BaseLayoutScreen>
                {
                    props =>
                        <Switch>
                            <PrivateRoute exact path="/" component={ (privateRouteProps) => (<HomePage {...privateRouteProps} {...props} />) } />
                            <PrivateRoute path="/user/edit" component={ (privateRouteProps) => (<UsersEdit {...privateRouteProps} {...props} />) } />
                            <PrivateRoute path="/user/view" component={ (privateRouteProps) => (<UserView {...privateRouteProps} {...props} />) } />
                            <PrivateRoute path="/user/all" component={ (privateRouteProps) => (<UsersAll {...privateRouteProps} {...props} />) } />
                            <PrivateRoute path="/user/add" component={ (privateRouteProps) => (<UsersAdd {...privateRouteProps} {...props} />) } />
                            <PrivateRoute path="/user/password" component={ (privateRouteProps) => (<PasswordEdit {...privateRouteProps} {...props} />) } />
                            <Route path="/login" component={ LoginPage } />
                            <Route path="/cadastro" component={ SignIn } />

                            <Route component={ NoMatchPage } /> 
                        </Switch>
                }
            </BaseLayoutScreen>
        </Router>
    );
}

export default Routes;