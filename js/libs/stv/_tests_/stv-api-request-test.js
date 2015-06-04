jest.dontMock('../js/libs/stv/stv-base-request');
jest.dontMock('jquery');

let jQuery = require('jquery');
let xhr = {};
import APIRequest from '../js/libs/stv/stv-base-request';


describe("it checks API requests", () => {
    let request = new APIRequest('player');
    let requestedUrl = '';
    let successFullResponse = require('../__json__/api-sample-success');
    beforeEach(() => {
        $ = jQuery;
        requestedUrl = '';
    });

    // make request and expect url to equal that of environment
    it("checks that the url called is as expected", () => {
        spyOn(request, 'makeAPIRequest').andCallThrough();
        spyOn($, 'Deferred').andCallThrough();
        spyOn($, 'ajax').andCallFake(function (e) {
            requestedUrl = e.url;
        });
        request.makeAPIRequest();
        expect(requestedUrl).toBe('http://player.api.stv.' + tld + '/v1/grouptoken/');
    });

    //check we can make api call types
    it("checks we can make API calls by type", () => {
        spyOn(request, 'makeAPIRequest').andCallThrough();
        spyOn($, 'Deferred').andCallThrough();
        spyOn($, 'ajax').andCallFake(function (e) {
            requestedUrl = e.url;
        });
        request.setType('episodes');
        request.makeAPIRequest();
        expect(requestedUrl).toBe('http://player.api.stv.' + tld + '/v1/episodes/');
    });

    // check the request and its methods
    it("checks that url calls are made with filtering params", () => {
        let data = {};
        //stv-api-parameters
        spyOn(request, 'makeAPIRequest').andCallThrough();
        spyOn($, 'ajax').andCallFake(function (e) {
            console.log(e.url);
            data = e.data;
        });
        spyOn($, 'Deferred').andCallThrough();
        // make the request
        request.setType('categories').orderBy('name,date').filter('createdBy');
        request.makeAPIRequest();
        // expect the paramaters sent to be those sepcified
        expect(data.orderBy).toContain('name,date');
        expect(data.filter).toContain('createdBy');
    });
    // simulate a done response with sample json and test


    // simulate a fail response and test


});
