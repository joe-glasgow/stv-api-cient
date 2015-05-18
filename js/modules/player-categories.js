// player-categories.js
import APIRequest from '../libs/stv/stv-api-request';

var categoriesRequest = new APIRequest({
	type: 'categories',
	limit: 'all',
	offset: 0,
	orderBy: 'isChannel,name'
}, 'player');

module.exports = categoriesRequest;
