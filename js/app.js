// App.js
var categories = require('./modules/player-categories');

categories.makeApiRequest().done(function(response) {
	console.log(response);
}).fail(function(xhr) {
	throw new Error('API responded with status text: ' + xhr.statusText);
});
