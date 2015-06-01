jest.dontMock('../js/libs/stv/stv-api-request');
jest.dontMock('../js/libs/stv/stv-api-builder');
jest.dontMock('jquery');

import APIRequest from '../js/libs/stv/stv-api-request';
import APIBuilder from '../js/libs/stv/stv-api-builder';

var $ = require('jquery');


var allCategoriesRequest = new APIRequest({
	type: 'categories',
	limit: 'all',
	offset: 0,
	orderBy: 'isChannel,name'
}, 'player');
var xhr = {};
var myInt = 2;


export default class Categories {
    getAll() {
        return allCategoriesRequest.makeApiRequest();
    }

    static getInstance() {
        return Categories._instance = Categories._instance || new Categories;
    }
}
    describe('dummy test', () => {
        var catRequest = Categories.getInstance();
        var complete = false;

        it('tests value', () => {
			var callback = jasmine.createSpy();

			catRequest.getAll().done((response) => {
				xhr = response;
				callback();
			}).fail((response) => {
				xhr = response;
				callback();
			});

            waitsFor(() => {
				return callback.callCount > 0;
			});
			runs(() => {
				expect(callback).toHaveBeenCalled();
			});



        });
    });
