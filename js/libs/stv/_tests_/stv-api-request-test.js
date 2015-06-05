jest.dontMock('../js/libs/stv/stv-base-request');
jest.dontMock('jquery');

let jQuery = require('jquery');
let xhr = {};
import APIRequest from '../js/libs/stv/stv-base-request';


describe("Call API request", () => {
    let request = new APIRequest('player');
    let requestedUrl = '';
    let successFullResponse = require('../__json__/api-sample-success');
    beforeEach(() => {
        $ = jQuery;
        requestedUrl = '';
    });

    // make request and expect url to equal that of environment
    it("and check that the url called is as expected", () => {
        spyOn(request, 'makeAPIRequest').andCallThrough();
        spyOn($, 'Deferred').andCallThrough();
        spyOn($, 'ajax').andCallFake(function (e) {
            requestedUrl = e.url;
        });
        request.makeAPIRequest();
        expect(requestedUrl).toBe('http://player.api.stv.' + tld + '/v1/grouptoken/');
    });

    //check we can make api call types
    it("and checks we can make API calls by type", () => {
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
    it("and checks that url calls are made with filtering params", () => {
        let data = {};
        //stv-api-parameters
        spyOn(request, 'makeAPIRequest').andCallThrough();
        spyOn($, 'ajax').andCallFake(function (e) {
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
    it("and check that a successful response returns data as expected", () => {
        let responseObj = '';
        // create a callback to continue when call complete
        let callback = jasmine.createSpy();
        spyOn(request, 'makeAPIRequest').andCallThrough();
        spyOn($, 'Deferred').andCallThrough();
        spyOn($, 'ajax').andCallFake((e) => {
            // a successful response would bring back json
            responseObj = successFullResponse;
            callback();
        });

        request.setType('episodes');
        request.makeAPIRequest();

        waitsFor(() => {
            return callback.callCount > 0;
        });

        runs(() => {
            // expect a JSON object
            expect(typeof responseObj).toBe('object');
            // expect a success response to be true
            expect(responseObj.success).toEqual(true);
            // expect results to be returned as an array
            expect(responseObj.results instanceof Array).toBe(true);
        });
    });

    // simulate a fail response and test


});
