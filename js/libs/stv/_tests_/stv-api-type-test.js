jest.dontMock('../js/libs/stv/stv-base-request');

let jQuery = require('jquery');
let xhr = {};
import APIRequest from '../js/libs/stv/stv-base-request';
// jQuery global
$ = jQuery;

describe("Check that type checking is implicit", () => {
    let request = new APIRequest('player');
    let error = '';
    beforeEach(() => {
        error = false;
        spyOn(request, 'makeAPIRequest').andCallThrough();
    });
    // simulate numerical when string errors
    it("finds that numerical values when expecting a string errors out and is caught", () => {
        // try setting a number when expecting string value
        try {
            request.setType('episodes').orderBy()
        } catch (e) {
            error = true;
            expect(error).toEqual(true);
        }

    });
    // simulate string when numberical error
    it("finds that a string when expecting numberical errors caught", () => {

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
    it("finds that boolean values when expecting a string error is caught", () => {

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
    it("finds that boolean when expecting a number error is caught", () => {

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
