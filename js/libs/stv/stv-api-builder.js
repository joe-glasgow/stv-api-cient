import Environment from './stv-environment';

var currentEnvironment = new Environment();

export default class APIBuilder {
	constructor() {
		// Assume app is in a hosted STV Environment
		this.offline = false;
		this._apiUrl = 'http://api.' + currentEnvironment.currentDomain() +
			currentEnvironment.tld;
		this._playerApiUrl = 'http://player.api.' + currentEnvironment.currentDomain() +
			currentEnvironment.tld;
		// If the App is not in a hosted Env
		if (window.location.host === 'localhost' || window.location.host === "") {
			this.offline = true;
			// This is the fallback main STV api url
			this._apiUrl = 'http://api.stv.jmor';
			// This is the fallback Player STV api url
			this._playerApiUrl = 'http://player.api.stv.jmor';
		};
		// the API version
		this.version = 'v1';
	}
	stvAPI() {
		return this._apiUrl + '/';
	}
	playerAPI() {
		return this._playerApiUrl + '/' + this.version + '/';
	}
}
