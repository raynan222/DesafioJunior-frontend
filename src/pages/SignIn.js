import React from 'react';
import { Component } from 'react';
import { FormPage, FormRow } from '../components/sbadmin/Layout';
import { InputInGroup, SaveButton, CancelButton, Select2Field } from '../components/sbadmin/Form';
import RestService from '../services/Rest';
import {confirmacao, error_axios} from '../services/Alerts';
import {regexInput} from '../components/utils/Utils';

const Rest = new RestService();

class SignIn extends Component
{

    static defaultProps = {
        title: "app.pages.users.title",
        request: {
            url: "login/update/complete/",
            method: "PUT",
        },
    }

    constructor(props) {
        super(props);

        this.state = {
            errors: {},
            loading: false,
            data: {}
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
        let value = this.fieldIdentifier(e)
        let data = {}
        let errors = {}

        if (this.state.data) {
            data = this.state.data;
        }

        data[e.target.name] = value;
        this.setState({data: data, errors: errors});
        console.log(this.state)
    }

    fieldIdentifier(e){
        if(e.target.name === "cpf"){
            return regexInput(e.target.value, "cpf")
        }
        else if(e.target.name === "pis"){
            return regexInput(e.target.value, "pis")
        }
        else if(e.target.name === "cep"){
            return regexInput(e.target.value, "cep")
        }
        return e.target.value;
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
                confirmacao("Oops!", res.data.message, "error").then(res =>{ 
                    this.setState({
                        errors: res.data.errors.fields,
                    });
                })
                
            }else if (!res.data.error){
                confirmacao("Sucesso!", res.data.message, "success").then(res =>
                    {this.goBack();}
                )
            }
            this.setState({
                loading: false,
            });
        }).catch(function (error){
			error_axios(error)
		});
    }

    render() 
    {
        return (
            <div className="row justify-content-center login-form">
                <div className="col-xl-10 col-lg-12 col-md-9">
                    
                        <div className="card-body p-0">
                            <FormPage title="page.user.add.title">
                                    
                                <FormRow>
                                    <InputInGroup type="text" name="email" errors={ [] }  onChange={ this.handleChange } 
                                        label='page.useredit.fields.email' required={false} colsize="4"/>
                                    <InputInGroup type="password" name="senha" errors={ [] }  onChange={ this.handleChange } 
                                        label='page.useredit.fields.senha' required={false} colsize="4"/>
                                    <InputInGroup type="text" name="nome" errors={ [] }  onChange={ this.handleChange } 
                                        label='page.useredit.fields.nome' required={false} colsize="4"/>
                                </FormRow>

                                <FormRow>
                                    <InputInGroup type="text" name="cpf" errors={ [] }  onChange={ this.handleChange }
                                        label='page.useredit.fields.cpf' required={false} colsize="6" value = {this.state.data.cpf}/>  
                                    <InputInGroup type="text" name="pis" errors={ [] }  onChange={ this.handleChange } 
                                        label='page.useredit.fields.pis' required={false} colsize="6" value = {this.state.data.pis}/>
                                </FormRow>
                                
                                <FormRow>
                                    <InputInGroup type="text" name="rua" errors={ [] }  onChange={ this.handleChange } 
                                        label='page.useredit.fields.rua' required={false} colsize="6"/>
                                    <InputInGroup type="text" name="numero" errors={ [] }  onChange={ this.handleChange } 
                                        label='page.useredit.fields.numero' required={false} colsize="3"/>
                                    <InputInGroup type="text" name="cep" errors={ [] }  onChange={ this.handleChange } 
                                        label='page.useredit.fields.cep' required={false} colsize="3" value = {this.state.data.cep}/>
                                </FormRow>

                                <FormRow>
                                    <InputInGroup type="text" name="bairro" errors={ [] }  onChange={ this.handleChange } 
                                        label='page.useredit.fields.bairro' required={false} colsize="4"/>
                                    <InputInGroup type="text" name="complemento" errors={ [] }  onChange={ this.handleChange } 
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
            
        );
    }
}

/*----------------------------------------------------------------------------------------------------*/

export { SignIn };