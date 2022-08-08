const env = process.env.ENV || "dev";
const back_uri = process.env.REACT_APP_BACK_URI || "http://localhost:5000";

const config = {
	'dev': {
		'domain': back_uri,
		'appName': "Frontend",
		'version': "1.0.0",
		'company': "Company",
		"site": "http://www.backend.com.br",
		'year': "2022"
	},
	'heroku': {
		'domain': back_uri,
		'appName': "Frontend",
		'version': "1.0.0",
		'company': "Company",
		
		'year': "2022"
	}
};

console.log(`we are on [${env}] mode`);
console.log(`we are on [${back_uri}]`);

export const Properties = config[env];
