import APIBuilder from './stv-api-builder';

var $ = require('jquery');
var apiUrl = new APIBuilder();

export default class APIRequest {
    constructor(options, api) {
        // throw an error if no argument provided
        if (options.type === undefined) {
            throw new Error("An API Request requires a type. Exiting.");
        }
        // throw an error if no argument provided
        if (api === 'undefined') {
            throw new Error('Please specify an API to use, either "stv" or "player"');
        }
        // set a context of the API, stv, player etc
        this.apiFamily = api;
        // Reference to this
        var self = this;
        // grab request type
        this.type = options.type;
        // remove type from data
        delete options.type;

        self.requestParameters = {};
        Object.keys(options).forEach(function(key) {
            self.requestParameters[key] = options[key];
        });
    }
    makeApiRequest() {
        // set the environment to use
        let env = '',
            dfd = $.Deferred();
        // decided if its the player or stv
        if (this.apiFamily === 'player') {
            env = apiUrl.playerAPI() + this.type + '/';
        } else {
            env = apiUrl.stvAPI();
        }
        // Grab API response
        $.getJSON(env,
            this.requestParameters,
            function(xhr) {
                dfd.resolve(xhr);
            }).fail(function(xhr, e) {
            dfd.reject(xhr, e);
        }).always(function(xhr) {
            if (!xhr.success) {
                dfd.reject(xhr);
            }
        });

        return dfd.promise();

    }
}
