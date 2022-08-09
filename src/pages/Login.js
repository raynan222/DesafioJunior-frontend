import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../components/sbadmin/Layout.css';
import getMessage from '../sets/Messages';
import AuthService from '../services/Auth';
import {alertas, error_axios} from '../services/Alerts';

const Auth = new AuthService();

class LoginPage extends Component
{
    constructor(props)
    {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            fieldErrors: [],
        };
    }
    
    UNSAFE_componentWillMount()
    {
    	if(Auth.loggedIn()) {
    		this.props.history.push('/');
    	}
    }

    handleChange(e) 
    {
        let data = {}
        
        if (this.state.data) {
            data = this.state.data;
        }

        data[e.target.name] = e.target.value;
        this.setState({data: data});
    }


    handleSubmit(e) 
    {   
        e.preventDefault();
        Auth.login(this.state.data.username, this.state.data.password).then(res => {
            if (res.error) {
                alertas(res, res.message)
            } else 
            {   
                alertas(res, "Seja bem vindo "+res.usuario.nome);
                this.props.history.push('/');
            }
        }).catch(function (error){
            error_axios(error)
        });
    }

    render()
    {
        return (
            <div className="row justify-content-center login-form">
                <div className="col-xl-10 col-lg-12 col-md-9">
                    <div className="card o-hidden border-0 shadow-lg my-5">
                        <div className="card-body p-0">
                            <div className="row">
                                <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                                <div className="col-lg-6">
                                    <div className="p-5">
                                        <div className="text-center">
                                            <form onSubmit={ this.handleSubmit } className="form-user">
                                                <h1 className="h4 text-gray-900 mb-4">{ getMessage("app.pages.login.title") }</h1>
                                                <div className="form-group">
                                                    <input type="text" onChange={ this.handleChange } className="form-control form-control-user" name="username" aria-describedby="emailHelp" placeholder={ getMessage("app.pages.login.login") } />
                                                    <div className="invalid-feedback">
                                                        { this.state.fieldErrors['username'] ? this.state.fieldErrors['username'] : ''}
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <input type="password" onChange={ this.handleChange } className="form-control form-control-user" name="password" placeholder={ getMessage("app.pages.login.password") } />
                                                    <div className="invalid-feedback">
                                                        { this.state.fieldErrors['password'] ? this.state.fieldErrors['password'] : ''}
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <div className="custom-control custom-checkbox small">
                                                        <input type="checkbox" className="custom-control-input" name="remember-me" id="remember-me" />
                                                        <label className="custom-control-label" htmlFor="remember-me">{ getMessage('app.pages.login.remember') }</label>
                                                    </div>
                                                </div>
                                                <button type="submit" className="btn btn-primary btn-user btn-block">{ getMessage('app.pages.login.enter') }</button>
                                                <hr />


                                                <div className="text-center">
                                                    <a className="small" href="#/cadastro">{ getMessage("app.pages.login.signin") } </a>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        );
    }
}

/*----------------------------------------------------------------------------------------------------*/

class NoMatchPage extends Component
{
    render()
    {
        return (
            <div className="text-center">
                <div className="error mx-auto" data-text="404">404</div>
                <p className="lead text-gray-800 mb-5">{ getMessage("app.pages.404.error") }</p>
                <p className="text-gray-500 mb-0">{ getMessage("app.pages.404.fail") }</p>
                <Link to="/">← { getMessage("app.pages.404.back") }</Link>
            </div>  
        );
    }
}

export { LoginPage, NoMatchPage };