import ListPage from '../components/template/ListPage';
import usersForm from '../forms/UsersForm';
import React from 'react';
import { Component } from 'react';
import Page from '../components/template/BasePage';
import { FormPage, FormRow } from '../components/sbadmin/Layout';
import { InputInGroup, SaveButton, CancelButton, SelectField, Select2Field } from '../components/sbadmin/Form';
import {Redirect} from "react-router-dom";
import RestService from '../services/Rest';
import Cookies from 'js-cookie';
import {alertas, error_axios} from '../services/Alerts';
import {regexInput} from '../components/utils/Utils';
const Rest = new RestService();

class UsersAdd extends FormPage
{
    static defaultProps = {
        title: "app.pages.users.title",
        request: {
            url: "user/add",
            method: "POST",
        },
        data: usersForm
    }
}

/*----------------------------------------------------------------------------------------------------*/

class UsersEdit extends Page
{
    static defaultProps = {
        title: "app.pages.users.title",
        request: {
            url: "login/update/complete/",
            method: "PUT",
        },
        data_send: {}
    }

    constructor(props) {
        super(props);

        this.state = {
            data: { "login": {
                        "usuario": {
                            "endereco": {},
                        },
                        "acesso": {},},},
            errors: {},
            loading: false,
            data_send: {},
        }

        this.handleChangeLogin = this.handleChangeLogin.bind(this);
        this.handleChangeUsuario = this.handleChangeUsuario.bind(this);
        this.handleChangeEndereco = this.handleChangeEndereco.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    componentDidMount() {
        let id = undefined;
        if (this.props.location.state !== undefined){
          id = this.props.location.state.item_id;
        }else{
          id = Cookies.get('user_profile_id');
          console.log(id)
        }
        if ( id === undefined) {
          this.setState(({error:true}));
          return;
        }
        
        Rest.get( "login/view/complete/" + id).then((data) => {
            this.setState(data);
        });
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
        else if(e.target.name === "acesso_id"){
            return parseInt(e.target.value);
        }
        return e.target.value;
    }

    fieldMask(value, mask){
        if(mask === "cpf" && value !== undefined){
            return regexInput(value, "cpf")
        }
        else if(mask === "pis" && value !== undefined){
            return regexInput(value, "pis")
        }
        else if(mask === "cep" && value !== undefined){
            return regexInput(value, "cep")
        }
        return value;
    }

    handleChangeLogin(e) 
    {
        let value = this.fieldIdentifier(e)
        let data = {}
        let data_send = {}
        
        data = this.state.data.login;
        data_send = this.state.data_send;
        
        data[e.target.name] = value;
        data_send[e.target.name] = value;


        this.setState(
            ...this.state,
            {
              data: {
                ...this.state.data,
                login: data
              },
              data_send: data_send
            }
          );
        console.log("data", this.state.data)
        console.log("mandar",this.state.data_send)
        console.log("submit_id", this.state.data.login.id);
    }

    handleChangeUsuario(e) 
    {
        let value = this.fieldIdentifier(e)
        let data = {}
        let data_send = {}
        
        data = this.state.data.login.usuario;
        data_send = this.state.data_send;
        
        data[e.target.name] = value;
        data_send[e.target.name] = value;
        
        this.setState(
            {
              ...this.state,
              data: {
                ...this.state.data,
                login: {
                    ...this.state.data.login,
                    usuario: data
                },
              },
              data_send: data_send
            }
          )
        console.log("data", this.state.data)
        console.log("mandar",this.state.data_send)
        console.log("submit_id", this.state.data.login.id);
    }

    handleChangeEndereco(e) 
    {
        let value = this.fieldIdentifier(e)
        let data = {}
        let data_send = {}
        
        data = this.state.data.login.usuario.endereco;
        data_send = this.state.data_send;
        
        data[e.target.name] = value;
        data_send[e.target.name] = value;
        

        this.setState(
            {
              ...this.state,
              data: {
                ...this.state.data,
                login: {
                    ...this.state.data.login,
                    usuario: {
                        ...this.state.data.login.usuario,
                        endereco: data
                    },
                },
              },
              data_send: data_send
            }
          )

        console.log("data", this.state.data)
        console.log("mandar",this.state.data_send)
        console.log("submit_id", this.state.data.login.id);
    }

    handleSubmit(e)
    {
        const url = "login/update/complete/" + this.state.data.login.id;
        const params = this.state.data_send;
        console.log(params);
        if (Object.keys(params).length > 0){
            Rest.put(url, params).then(res => {
                console.log(res)
                if (res.data.error) {
                    alertas(res.data, res.data.message);
                } else {
                    alertas(res.data, res.data.message);
                    this.goBack();
                }
            }).catch(function (error){
                error_axios(error)
            });
        }
    }

    render() 
    {
    
        return (
            this.state.error ?
                ( <Redirect to={{ pathname: "/user/all", state: { from: this.props.location } }}/> ) :
                <FormPage title="page.useredit.add.title">
                
                <FormRow>
                    <InputInGroup type="email" name="email" errors={ [] }  onChange={ this.handleChangeLogin } 
                        label='page.useredit.fields.email' required={false} colsize="6" value={this.state.data.login.email}/>
                    <InputInGroup type="nome" name="nome" errors={ [] }  onChange={ this.handleChangeUsuario } 
                        label='page.useredit.fields.nome' required={false} colsize="6" value={this.state.data.login.usuario.nome}/>
                </FormRow>

                <FormRow>
                    <InputInGroup type="cpf" name="cpf" errors={ [] }  onChange={ this.handleChangeUsuario }
                        label='page.useredit.fields.cpf' required={false} colsize="6" value={this.fieldMask(this.state.data.login.usuario.cpf, "cpf")}/>   
                    <InputInGroup type="pis" name="pis" errors={ [] }  onChange={ this.handleChangeUsuario } 
                        label='page.useredit.fields.pis' required={false} colsize="6" value={this.fieldMask(this.state.data.login.usuario.pis, "pis")}/>
                </FormRow>
                
                <FormRow>
                    <InputInGroup type="rua" name="rua" errors={ [] }  onChange={ this.handleChangeEndereco } 
                        label='page.useredit.fields.rua' required={false} colsize="6" value={this.state.data.login.usuario.endereco.rua}/>
                    <InputInGroup type="numero" name="numero" errors={ [] }  onChange={ this.handleChangeEndereco } 
                        label='page.useredit.fields.numero' required={false} colsize="3" value={this.state.data.login.usuario.endereco.numero}/>
                    <InputInGroup type="cep" name="cep" errors={ [] }  onChange={ this.handleChangeEndereco } 
                        label='page.useredit.fields.cep' required={false} colsize="3" value={this.fieldMask(this.state.data.login.usuario.endereco.cep, "cep")}/>
                </FormRow>

                <FormRow>
                    <InputInGroup type="bairro" name="bairro" errors={ [] }  onChange={ this.handleChangeEndereco } 
                        label='page.useredit.fields.bairro' required={false} colsize="4" value={this.state.data.login.usuario.endereco.bairro}/>
                    <InputInGroup type="complemento" name="complemento" errors={ [] }  onChange={ this.handleChangeEndereco } 
                        label='page.useredit.fields.complemento' required={false} colsize="4" value={this.state.data.login.usuario.endereco.complemento}/>
                    <Select2Field
                        name="Municipio-Estado" colsize="4" onChange={ this.handleChangeEndereco } value={this.state.data.login.usuario.endereco.municipio_id} url_view="municipio/view" url_list="municipio/list"
                        filterName="nome" displayName={["nome", "estado"]} label="page.useredit.fields.municipio_estado" required={false} errors={[]}
                    />
                </FormRow>

                {Cookies.get("user_profile_role")==1 ?
                <FormRow>
                    <SelectField empty={ false } value_name="id" name='acesso_id' errors={ [] }  onChange={ this.handleChangeLogin }
                        label='page.useredit.fields.role' required={false} colsize="12" url="acesso/all" value={this.state.data.login.acesso_id} />
                </FormRow>:''}
                
                <div className="btn-form">
                    <SaveButton onClick={ this.handleSubmit }/>
                    <CancelButton onClick={ this.goBack } />
                </div>
            </FormPage>
            //<a>asdassd</a>
        );
    }
}

/*----------------------------------------------------------------------------------------------------*/

class UserView extends Page
{
    constructor(props) {
        super(props);

        this.state = {
            data: {"login": {"usuario": {
                "endereco": {

                }}}},
            errors: {},
            loading: false,
        }
    }


    componentDidMount() {
        let id = undefined;
        console.log(this.props)
        if (this.props.location.state !== undefined){
          id = this.props.location.state.item_id;
        }else{
          id = Cookies.get('user_profile_id');
        }
        if ( id === undefined) {
          this.setState(({error:true}));
          return;
        }
        
        Rest.get("login/view/complete/"+ id).then((data) => {this.setState((data));return data});


    }

    fieldMask(value, mask){
        if(mask == "cpf" && value != undefined){
            return regexInput(value, "cpf")
        }
        else if(mask == "pis" && value != undefined){
            return regexInput(value, "pis")
        }
        else if(mask == "cep" && value != undefined){
            return regexInput(value, "cep")
        }
        return value;
    }

    render() 
    {
        if (this.state.data.error){
            alertas(this.state.data, this.state.data.message);
            return(<Redirect to={{ pathname: "/user/all", state: { from: this.props.location } }}/> );
        }
        else{
            console.log()
            let fields = [{label:"Email: ", value:this.state.data.login.email},
					  {label:"Nome: ", value:this.state.data.login.usuario.nome},
                      {label:"CPF: ", value:this.fieldMask(this.state.data.login.usuario.cpf, "cpf")},
                      {label:"PIS: ", value:this.fieldMask(this.state.data.login.usuario.pis, "pis")},
                      {label:"CEP: ", value:this.fieldMask(this.state.data.login.usuario.endereco.cep, "cep")},
                      {label:"Rua: ", value:this.state.data.login.usuario.endereco.rua},
                      {label:"Numero: ", value:this.state.data.login.usuario.endereco.numero},
                      {label:"Bairro: ", value:this.state.data.login.usuario.endereco.bairro},
                      {label:"Complemento: ", value:this.state.data.login.usuario.endereco.complemento},
                      {label:"Municipio: ", value:this.state.data.login.usuario.endereco.municipio},
                      {label:"Estado: ", value:this.state.data.login.usuario.endereco.estado},
                      {label:"Pais: ", value:this.state.data.login.usuario.endereco.pais},
			         ];
        return (
            <BasicView title="Nada" url={"login/view/complete/?id=" + this.state.id} fields={fields}/>
		);}
    }
}


/*----------------------------------------------------------------------------------------------------*/

class BasicView extends Component
{
    render()
	{
		let text_fields = this.props.fields.map( (field) => {
			return (<div key={field.label} className={"card-text"}><b>{field.label}</b>{field.value}</div>);
		});
		return (<div className="card mb-2">
			        <div className="card-body">
				        {text_fields}
			        </div>
		        </div>);
	}
}

/*----------------------------------------------------------------------------------------------------*/

class PasswordEdit extends Component
{
    static defaultProps = {
        title: "app.pages.users.title",
        request: {
            url: "login/update/senha/",
            method: "PUT",
        },
        data: usersForm,
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
        const url = "login/update/senha";
        const params = this.state.data;
        
        this.setState({
            loading: true,
        });
        
        Rest.put(url, params).then(res => 
        {
            if (res.data.error)
            {
                alertas(res.data, res.data.message)
            }else{
                alertas(res.data, res.data.message)
                this.goBack();
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
                            <FormPage title="page.user.password.edit.title">
                                    
                                <FormRow>
                                    <InputInGroup type="password" name="senha_antiga" errors={ [] }  onChange={ this.handleChange } 
                                        label='page.useredit.fields.senha_antiga' required={true} colsize="8"/>
                                </FormRow>
                                <FormRow>
                                    <InputInGroup type="password" name="senha_nova1" errors={ [] }  onChange={ this.handleChange } 
                                        label='page.useredit.fields.senha_nova1' required={true} colsize="8"/>
                                </FormRow>
                                <FormRow>
                                    <InputInGroup type="password" name="senha_nova2" errors={ [] }  onChange={ this.handleChange } 
                                        label='page.useredit.fields.senha_nova2' required={false} colsize="8"/>
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

class UsersAll extends ListPage
{
    static defaultProps = {
        title: "app.pages.users.title",
        url: "login/list/complete",
        url_user_delete: "/login/delete/complete/",
        url_user_edit: "/user/edit/",
        url_user_view: "/user/view/",
        fields: [
            {name: "id", label: "app.pages.users.id", width: "5%"},
            {name: "email", label: "app.pages.users.email"},
            {name: "acesso.nome",  label: "app.pages.users.role_name"},
            {name: "usuario.nome", label: "app.pages.users.name"},
            {name: "usuario.cpf", label: "app.pages.users.cpf"},
            {name: "usuario.pis", label: "app.pages.users.pis"},
        ],
    }
}

export { UsersEdit, UsersAdd, UsersAll, UserView, PasswordEdit };