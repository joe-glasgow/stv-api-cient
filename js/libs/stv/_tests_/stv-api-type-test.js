jest.dontMock('../js/libs/stv/stv-base-request');

let jQuery = require('jquery');
let xhr = {};
import APIRequest from '../js/libs/stv/stv-base-request';
// jQuery global
$ = jQuery;

describe("Check that type checking is implicit and", () => {
    let request = new APIRequest('player');
    let error = '';
    beforeEach(() => {
        error = false;
    });
    // simulate numerical when string errors
    it("will check that numerical when string errors are reported and caught", () => {

        spyOn(request, 'makeAPIRequest').andCallThrough();

        try {
            request.setType('episodes').orderBy(42)
        } catch (e) {
            error = true;
            expect(error).toEqual(true);
        }

    });
    // simulate string when numberical error
    it("will check that string when numberical errors are reported and caught", () => {

        spyOn(request, 'makeAPIRequest').andCallThrough();
        // check that string failes
        try {
            request.setType('episodes').groupToken('myString')
        } catch (e) {
            error = true;
            expect(error).toEqual(true);
            // reset for next try
            error = false;
        }
        // check number as string will fail
        try {
            request.setType('episodes').groupToken('123');
        } catch(e) {
            error = true;
            expect(error).toEqual(true);
        }

    });
    // simulate boolean when string
    it("will check that numerical when string errors are reported and caught", () => {

        spyOn(request, 'makeAPIRequest').andCallThrough();
        // try when true instead of string
        try {
            request.setType('episodes').startLetter(true);
        } catch (e) {
            error = true;
            expect(error).toEqual(true);
            error = false;
        }

        // try when true instead of string
        try {
            request.setType('episodes').startLetter(false);
        } catch (e) {
            error = true;
            expect(error).toEqual(true);
        }

    });
    // simulate boolean when numberical
    it("will check that numerical when string errors are reported and caught", () => {

        spyOn(request, 'makeAPIRequest').andCallThrough();
        // check refuses true when expecting number
        try {
            request.setType('episodes').groupToken(true);
        } catch (e) {
            error = true;
            expect(error).toEqual(true);
            error = false;
        }

        // check refuses false when expecting number
        try {
            request.setType('episodes').groupToken(false);
        } catch (e) {
            error = true;
            expect(error).toEqual(true);
        }

    });

});
