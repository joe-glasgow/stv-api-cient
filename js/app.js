// App.js
import Categories from './modules/player-categories';

var catRequest = new Categories();

catRequest.getAll.makeApiRequest().done(function(response) {
	console.log(response);
}).fail(function(xhr) {
	throw new Error('API responded with status text: ' + xhr.statusText);
});
