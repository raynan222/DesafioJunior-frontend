import decode from 'jwt-decode';
import { Properties } from '../config';
import axios from 'axios';
import Cookies from 'js-cookie';

class AuthService 
{

/*----------------------------------------------------------------------------------------------------*/

	constructor(domain)
	{
		this.domain			= domain || Properties.domain;
		this.fetch			= this.fetch.bind(this);
		this.login			= this.login.bind(this);
		this.user  			= null;
	}

/*----------------------------------------------------------------------------------------------------*/

	login(username, password) 
	{
		return this.fetch(`${this.domain}/login`,
			{
				method: 'POST',
				body: JSON.stringify({
					"email/cpf/pis": username, 
					senha: password
				})
			}
		).then(res =>
		{
			if (!res.error) 
			{
				this.setToken(res.access_token);
				this.setRefreshToken(res.refresh_token);
				this.setUser({role: res.user_role});
				this.updateProfile(res.access_token);
			}
			
			return Promise.resolve(res);
		});
	}

/*----------------------------------------------------------------------------------------------------*/

	loggedIn() 
	{
		const token = this.getToken();
		if (!!!token) {
			return false;
		}

		if (this.isTokenExpired(token)) 
		{
			const rfToken = this.getRefreshToken();

			if(this.isTokenExpired(rfToken)) {
				this.logout();
				return false;
			}
		}
		
		return true;
	}

/*----------------------------------------------------------------------------------------------------*/

	isTokenExpired(token) 
	{
		try
		{
			const decoded = decode(token);

			if (decoded.exp < Date.now() / 1000) {
				return true;
			} 
			
			return false;

		} catch(err) {
			return false;
		}
	}

/*----------------------------------------------------------------------------------------------------*/	

	doRequest(url, method, data, headers, responseType=null)
	{
		if (this.loggedIn())
		{
			const token = this.getToken();
			
			if (this.isTokenExpired(token))
			{
				let self = this;
				return axios({
					url: `${ this.domain }/refresh`,
					method: 'POST',
					headers: {
						Authorization: self.getAuthorizationRefreshHeader(),
						...headers
					}
				}).then(res => {

					if (res.status === 200) 
					{
						console.log("token refreshed")
						self.setToken(res.data.access_token);
						
						let request = {
							url: `${ self.domain }/${url}`,
							method: method,
							responseType: responseType,
							headers: {
								Authorization: self.getAuthorizationHeader(),
								...headers
							}
						}

						if (method === "GET") 
						{
							request = {
								...request,
								params: data
							}
						} else
						{
							request = {
								...request,
								data: data
							}
						}

						return axios(request)
					}
				})
			} 
			else 
			{
				let request = {
					url: `${ this.domain }/${url}`,
					method: method,
					responseType: responseType,
					headers: {
						Authorization: this.getAuthorizationHeader()
					}
				} 
				
				if (method === "GET") 
				{
					request = {
						...request,
						params: data
					}
				} else
				{
					request = {
						...request,
						data: data
					}
				}

				return axios(request)
			}
		} else {
			this.logout();
		}
	}

/*----------------------------------------------------------------------------------------------------*/

	setToken(idToken) {
		Cookies.set('id_token', idToken);
	}

/*----------------------------------------------------------------------------------------------------*/

	getToken() {
		return Cookies.get('id_token');
	}

/*----------------------------------------------------------------------------------------------------*/

	setRefreshToken(idToken) {
		Cookies.set('id_refresh_token', idToken);
	}

/*----------------------------------------------------------------------------------------------------*/

	getRefreshToken() {
		return Cookies.get('id_refresh_token');
	}

/*----------------------------------------------------------------------------------------------------*/

clearCache(){
	Cookies.remove('id_token');
	Cookies.remove('id_refresh_token');
	Cookies.remove('user_profile_role');
	Cookies.remove('user_profile_rolename');
	Cookies.remove('user_profile_id');
	Cookies.remove('user_profile_email');

	Cookies.remove('user_profile_cpf');
	Cookies.remove('user_profile_name');
	Cookies.remove('user_profile_pis');

	Cookies.remove('user_profile_bairro');
	Cookies.remove('user_profile_cep');
	Cookies.remove('user_profile_complemento');
	Cookies.remove('user_profile_estado');
	Cookies.remove('user_profile_estado_sigla');
	Cookies.remove('user_profile_municipio');
	Cookies.remove('user_profile_numero');
	Cookies.remove('user_profile_pais');
	Cookies.remove('user_profile_rua');
}

/*----------------------------------------------------------------------------------------------------*/

	logout() {
		this.clearCache();
		window.location.replace("/");
	}

/*----------------------------------------------------------------------------------------------------*/
	
	updateProfile(token) {
		fetch(`${this.domain}/loginview`,
			{
				method: 'GET',
				headers: {Authorization: 'Bearer ' + token}
			}
		)
			.then(res => 
			{
				res.json().then(json => {
					Cookies.set('user_profile_id', json.id);
					Cookies.set('user_profile_email', json.email);
					Cookies.set('user_profile_role', json.acesso_id);
			
					Cookies.set('user_profile_cpf', json.usuario.cpf);
					Cookies.set('user_profile_name', json.usuario.nome);
					Cookies.set('user_profile_pis', json.usuario.pis);

					Cookies.set('user_profile_bairro', json.usuario.endereco.bairro);
					Cookies.set('user_profile_cep', json.usuario.endereco.cep);
					Cookies.set('user_profile_complemento', json.usuario.endereco.complemento);
					Cookies.set('user_profile_estado', json.usuario.endereco.estado);
					Cookies.set('user_profile_estado_sigla', json.usuario.endereco.estado_sigla);
					Cookies.set('user_profile_municipio', json.usuario.endereco.municipio);
					Cookies.set('user_profile_numero', json.usuario.endereco.numero);
					Cookies.set('user_profile_pais', json.usuario.endereco.pais);
					Cookies.set('user_profile_rua', json.usuario.endereco.rua);
					Cookies.set('user_profile_rolename', json.acesso.nome);
					}
				)
			}
		)	
	}

/*----------------------------------------------------------------------------------------------------*/
	
	setUser(data) {
		this.user = data;
	}

/*----------------------------------------------------------------------------------------------------*/
	
	getUser() {
		return this.user;
	}

/*----------------------------------------------------------------------------------------------------*/

	getUserRole() 
	{
		if (this.getUser() == null) {
			return Cookies.get('user_profile_role');
		} 
		else {
			return this.getUser().role;
		}
	}

/*----------------------------------------------------------------------------------------------------*/

	getAuthorizationHeader() {
		return 'Bearer ' + this.getToken();
	}

/*----------------------------------------------------------------------------------------------------*/

	getAuthorizationRefreshHeader() {
		return 'Bearer ' + this.getRefreshToken();
	}

/*----------------------------------------------------------------------------------------------------*/

	fetch(url, options) 
	{	
		const headers = {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		}

		if (this.loggedIn()) {
			headers['Authorization'] = this.getAuthorizationHeader();
		}

		return fetch(url, 
		{
			headers,
			...options
		})
			.then(this._checkStatus)
			.then(response => response.json())
	}

/*----------------------------------------------------------------------------------------------------*/

	_checkStatus(response) {
		if (response.status >= 200 && response.status < 300) {
			return response;
		} 
		else 
		{
			var error = new Error(response.statusText);
			error.response = response;
			throw error;
		}
	}

/*----------------------------------------------------------------------------------------------------*/

}

export default AuthService;