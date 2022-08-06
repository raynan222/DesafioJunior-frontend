import ListPage from '../components/template/ListPage';
import usersForm from '../forms/UsersForm';
import React from 'react';
import { Component } from 'react';
import { FormPage, FormRow } from '../components/sbadmin/Layout';
import { InputInGroup, SaveButton, CancelButton, Select2Field } from '../components/sbadmin/Form';
import {Redirect} from "react-router-dom";
import RestService from '../services/Rest';

const Rest = new RestService();

class SignIn extends Component
{
    
    static defaultProps = {
        title: "app.pages.users.title",
        request: {
            url: "login/update/complete/",
            method: "PUT",
        },
        data: usersForm
    }

    constructor(props) {
        super(props);

        this.state = {
            data: {"usuario": {
                "endereco": {

                },
            },},
            errors: {},
            loading: false,
        }

        this.goBack = this.goBack.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    goBack() {
        this.props.history.goBack();
    }

    handleChange(e) 
    {
        let data = {}
        let errors = {}

        if (this.state.data) {
            data = this.state.data;
        }

        if (this.state.errors) {
            errors = this.state.errors;
        }

        errors[e.target.name] = {message: ""};
        data[e.target.name] = e.target.value;
        this.setState({data: data, errors: errors});
        console.log(this.state)
    }

    handleSubmit(e)
    {
        const url = "login/cadastro";
        const params = this.state.data;
        
        this.setState({
            loading: true,
        });
        
        Rest.post_unauthenticated(url, params).then(res => 
        {
            if (res.data.error)
            {
                //AlertifyError(res.data.errors.form)
                this.setState({
                    errors: res.data.errors.fields,
                });
            }
            
            this.setState({
                loading: false,
            });
        });
    }

    render() 
    {
        return (
            <div className="row justify-content-center login-form">
                <div className="col-xl-10 col-lg-12 col-md-9">
                    <div className="card o-hidden border-0 shadow-lg my-5">
                        <div className="card-body p-0">
                            <FormPage title="page.user.add.title">
                                    
                                <FormRow>
                                    <InputInGroup type="email" name="email" errors={ [] }  onChange={ this.handleChange } 
                                        label='page.useredit.fields.email' required={false} colsize="4"/>
                                    <InputInGroup type="senha" name="senha" errors={ [] }  onChange={ this.handleChange } 
                                        label='page.useredit.fields.senha' required={false} colsize="4"/>
                                    <InputInGroup type="nome" name="nome" errors={ [] }  onChange={ this.handleChange } 
                                        label='page.useredit.fields.nome' required={false} colsize="4"/>
                                </FormRow>

                                <FormRow>
                                    <InputInGroup type="cpf" name="cpf" errors={ [] }  onChange={ this.handleChange }
                                        label='page.useredit.fields.cpf' required={false} colsize="6"/>  
                                    <InputInGroup type="pis" name="pis" errors={ [] }  onChange={ this.handleChange } 
                                        label='page.useredit.fields.pis' required={false} colsize="6"/>
                                </FormRow>
                                
                                <FormRow>
                                    <InputInGroup type="rua" name="rua" errors={ [] }  onChange={ this.handleChange } 
                                        label='page.useredit.fields.rua' required={false} colsize="6"/>
                                    <InputInGroup type="numero" name="numero" errors={ [] }  onChange={ this.handleChange } 
                                        label='page.useredit.fields.numero' required={false} colsize="3"/>
                                    <InputInGroup type="cep" name="cep" errors={ [] }  onChange={ this.handleChange } 
                                        label='page.useredit.fields.cep' required={false} colsize="3"/>
                                </FormRow>

                                <FormRow>
                                    <InputInGroup type="bairro" name="bairro" errors={ [] }  onChange={ this.handleChange } 
                                        label='page.useredit.fields.bairro' required={false} colsize="4"/>
                                    <InputInGroup type="complemento" name="complemento" errors={ [] }  onChange={ this.handleChange } 
                                        label='page.useredit.fields.complemento' required={false} colsize="4"/>
                                    <Select2Field
                                        name="municipio_id" colsize="4" onChange={this.handleChange} url_view="municipio/view" url_list="municipio/list"
                                        filterName="nome" displayName={["nome", "estado"]} label="page.useredit.fields.municipio_estado" required={false} errors={[]}/>
                                </FormRow>


                                <div className="btn-form">
                                    <SaveButton onClick={ this.handleSubmit }/>
                                    <CancelButton onClick={ this.goBack }  />
                                </div>
                            </FormPage>
                        </div>
                    </div>
                </div>
            </div> 
        );
    }
}

/*----------------------------------------------------------------------------------------------------*/

export { SignIn };