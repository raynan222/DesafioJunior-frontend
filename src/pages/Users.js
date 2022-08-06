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
        data: usersForm,
        data_send: {}
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

        this.handleChange = this.handleChange.bind(this);
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
        
        Rest.get( "login/view/complete/" + id, this.state).then((data) => {this.setState((data));return data}).then((data) => {this.setState({data_send: Object.assign(...data)});});; 
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
        const url = "login/update/complete/" + this.state.data.id;
        const params = this.state.data;
        
        this.setState({
            loading: true,
        });

        console.log(this.state)
        /*
        Rest.put(url, params).then(res => 
        {
            if (res.data.error)
            {
                AlertifyError(res.data.errors.form)
                this.setState({
                    errors: res.data.errors.fields,
                });
            }
            
            this.setState({
                loading: false,
            });
        });*/
    }

    render() 
    {
        return (
            this.state.error ?
                ( <Redirect to={{ pathname: "/user/all", state: { from: this.props.location } }}/> ) :
                <FormPage title="page.useredit.add.title">
                
                <FormRow>
                    <InputInGroup type="email" name="email" errors={ [] }  onChange={ this.handleChange } 
                        label='page.useredit.fields.email' required={false} colsize="6" value={this.state.data.email}/>
                    <InputInGroup type="nome" name="nome" errors={ [] }  onChange={ this.handleChange } 
                        label='page.useredit.fields.nome' required={false} colsize="6" value={this.state.data.usuario.nome}/>
                </FormRow>

                <FormRow>
                    <InputInGroup type="cpf" name="cpf" errors={ [] }  onChange={ this.handleChange }
                        label='page.useredit.fields.cpf' required={false} colsize="6" value={this.state.data.usuario.cpf}/>   
                    <InputInGroup type="pis" name="pis" errors={ [] }  onChange={ this.handleChange } 
                        label='page.useredit.fields.pis' required={false} colsize="6" value={this.state.data.usuario.pis}/>
                </FormRow>
                
                <FormRow>
                    <InputInGroup type="rua" name="rua" errors={ [] }  onChange={ this.handleChange } 
                        label='page.useredit.fields.rua' required={false} colsize="6" value={this.state.data.usuario.endereco.rua}/>
                    <InputInGroup type="numero" name="numero" errors={ [] }  onChange={ this.handleChange } 
                        label='page.useredit.fields.numero' required={false} colsize="3" value={this.state.data.usuario.endereco.numero}/>
                    <InputInGroup type="cep" name="cep" errors={ [] }  onChange={ this.handleChange } 
                        label='page.useredit.fields.cep' required={false} colsize="3" value={this.state.data.usuario.endereco.cep}/>
                </FormRow>

                <FormRow>
                    <InputInGroup type="bairro" name="bairro" errors={ [] }  onChange={ this.handleChange } 
                        label='page.useredit.fields.bairro' required={false} colsize="4" value={this.state.data.usuario.endereco.bairro}/>
                    <InputInGroup type="complemento" name="complemento" errors={ [] }  onChange={ this.handleChange } 
                        label='page.useredit.fields.complemento' required={false} colsize="4" value={this.state.data.usuario.endereco.complemento}/>
                    <Select2Field
                        name="Municipio-Estado" colsize="4" onChange={this.handleChange} value={this.state.data.usuario.endereco.municipio_id} url_view="municipio/view" url_list="municipio/list"
                        filterName="nome" displayName={["nome", "estado"]} label="page.useredit.fields.municipio_estado" required={false} errors={[]}
                    />
                </FormRow>


                <FormRow>
                    <SelectField empty={ false } value_name="id" name='nome' errors={ [] }  onChange={ this.handleChange }
                        label='page.useredit.fields.role' required={false} colsize="12" url="acesso/all" value={this.state.data.acesso_id} />
                </FormRow>


                <div className="btn-form">
                    <SaveButton onClick={ this.handleSubmit }/>
                    <CancelButton onClick={ this.goBack } />
                </div>
            </FormPage>
        );
    }
}

/*----------------------------------------------------------------------------------------------------*/

class UserView extends Page
{
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
    }


    componentDidMount() {
        let id = undefined;
        console.log(this.props)
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
        
        Rest.get("login/view/complete/"+ id).then((data) => {this.setState((data));return data});
    }

    render() 
    {
        console.log(this.state)
        let fields = [{label:"Email: ", value:this.state.data.email},
					  {label:"Nome: ", value:this.state.data.usuario.nome},
                      {label:"CPF: ", value:this.state.data.usuario.cpf},
                      {label:"PIS: ", value:this.state.data.usuario.pis},
                      {label:"CEP: ", value:this.state.data.usuario.endereco.cep},
                      {label:"Rua: ", value:this.state.data.usuario.endereco.rua},
                      {label:"Numero: ", value:this.state.data.usuario.endereco.numero},
                      {label:"Bairro: ", value:this.state.data.usuario.endereco.bairro},
                      {label:"Complemento: ", value:this.state.data.usuario.endereco.complemento},
                      {label:"Municipio: ", value:this.state.data.usuario.endereco.municipio},
                      {label:"Estado: ", value:this.state.data.usuario.endereco.estado},
                      {label:"Pais: ", value:this.state.data.usuario.endereco.pais},
			         ];
        return (
            <BasicView title="Nada" url={"login/view/complete/?id=" + this.state.id} fields={fields}/>
		);
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
                            <FormPage title="page.user.password.edit.title">
                                    
                                <FormRow>
                                    <InputInGroup type="senha_antiga" name="senha_antiga" errors={ [] }  onChange={ this.handleChange } 
                                        label='page.useredit.fields.senha_antiga' required={false} colsize="4"/>
                                    <InputInGroup type="senha_nova1" name="senha_nova1" errors={ [] }  onChange={ this.handleChange } 
                                        label='page.useredit.fields.senha_nova1' required={false} colsize="4"/>
                                    <InputInGroup type="senha_nova2" name="senha_nova2" errors={ [] }  onChange={ this.handleChange } 
                                        label='page.useredit.fields.senha_nova2' required={false} colsize="4"/>
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
        url_user_delete: "login/delete/",
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