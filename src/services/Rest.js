import AuthService from './Auth';
import { Properties } from '../config';
import axios from 'axios';

class RestService {

/*----------------------------------------------------------------------------------------------------*/

	constructor() {
		this.Auth = new AuthService();
	}

/*----------------------------------------------------------------------------------------------------*/

	get(urlBase, parameters=null) {
		return this.Auth.doRequest(urlBase, 'GET', parameters, {}, null);		
	}

	get_unauthenticated(url, parameters=null) {
		this.domain	= Properties.domain;
		let request = {
			url: `${ this.domain }/${url}`,
			method: "GET",
			responseType: null,
		}
		
		request = {
			...request,
			params: parameters
		}
		return axios(request)		
	}
	

/*----------------------------------------------------------------------------------------------------*/

	post(urlBase, parameters=null) {
		return this.Auth.doRequest(urlBase, 'POST', parameters, {}, null);
	}

	post_unauthenticated(url, data=null) {
		this.domain	= Properties.domain;
		let request = {
			url: `${ this.domain }/${url}`,
			method: "POST",
			responseType: null,
		}
		
		request = {
			...request,
			data: data
		}
		return axios(request)	
	}

/*----------------------------------------------------------------------------------------------------*/

	delete(urlBase, parameters=null) {
		return this.Auth.doRequest(urlBase, 'DELETE', parameters, {}, null);
	}

	/* ----------------------------------------------------------------------------------------------------*/

	put(urlBase, parameters=null) {
		return this.Auth.doRequest(urlBase, 'PUT', parameters, {}, null);		
	}

	/*----------------------------------------------------------------------------------------------------*/

}

export default RestService;