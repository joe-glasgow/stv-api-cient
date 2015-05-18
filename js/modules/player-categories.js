// player-categories.js
import APIRequest from '../libs/stv/stv-api-request';

var allCategoriesRequest = new APIRequest({
	type: 'categories',
	limit: 'all',
	offset: 0,
	orderBy: 'isChannel,name'
}, 'player');

export default class Categories {
	constructor () {
		this.getAll = allCategoriesRequest;
	}
}
