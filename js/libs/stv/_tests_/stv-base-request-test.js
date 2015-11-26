jest.dontMock('../js/libs/stv/stv-base-request');
jest.mock('jquery');
let jquery = require('jquery');
let xhr = {};
import APIRequest from '../js/libs/stv/stv-base-request';
// jQuery global

// Instantiating class
describe("Construct a new request", () => {
    let noRequest = new APIRequest();
    let stvRequest = new APIRequest('stv');
    let playerRequest = new APIRequest('player');

    it("checks that than an empty request fails", () => {
        expect(noRequest.api).toBe(undefined);
    });

    it("checks that the stv request returns correct api", () => {
        expect(stvRequest.api).toBe('stv');
    });

    it("checks that player request returns correct api", () => {
        expect(playerRequest.api).toBe('player');
    });
});

// Making requests
describe("Make an API request", () => {
    let request = new APIRequest('player');
    let requestedUrl = '';
    let requestType = '';
    let successFullResponse = require('../__json__/api-sample-success');
    let failResponse = require('../__json__/api-sample-fail');
    let error = false;

    beforeEach(() => {
        $ = jquery;
        requestedUrl = '';
    });

    // make request and expect url to equal that of environment
    it("and checks that the url called is as expected", () => {
        spyOn(request, 'makeAPIRequest').andCallThrough();
        spyOn($, 'Deferred').andCallThrough();
        spyOn($, 'ajax').andCallFake(function (e) {
            requestedUrl = e.url;
        });

        request.makeAPIRequest();
        // alternative : $.ajax.mostRecentCall.args[0].url
        expect(requestedUrl).toBe('http://player.api.stv.' + tld + '/v1/grouptoken/');
    });

    //check we can make api call types
    it("and checks we can make API calls by type", () => {
        spyOn(request, 'makeAPIRequest').andCallThrough();
        spyOn($, 'Deferred').andCallThrough();
        spyOn($, 'ajax').andCallFake(function (e) {
            requestedUrl = e.url;
            requestType = e.type;
        });
        request.setType('episodes');
        request.makeAPIRequest();
        // ensure it is a 'GET' request
        expect(requestType).toBe('GET');
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
        request.setType('categories').orderBy('name,date');
        request.makeAPIRequest();
        // expect the paramaters sent to be those sepcified
        expect(data.orderBy).toContain('name,date');
    });
    // simulate a done response with sample json and test
    it("and checks that a successful response returns data as expected", () => {
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
    it(" and checks that fails can be handled as expected", () => {
        // expect a "false" success e.g. fail
        expect(failResponse.success).toEqual(false);
        // expect to be given a numbericl reason code
        expect(typeof failResponse.reason.code).toBe("number");
        // expect to be given a string error message
        expect(typeof failResponse.reason.message).toBe("string");
    });



});
