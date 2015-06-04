jest.dontMock('../js/libs/stv/stv-api-builder.js');

import APIBuilder from '../js/libs/stv/stv-api-builder';

describe('it runs a jest task', () => {
    it("gets the correct API instance", function () {
        let localAPI = new APIBuilder();
        expect(localAPI.fetchAPI('player')).toBe('http://player.api.stv.' + tld + '/v1/');
        expect(localAPI.fetchAPI('stv')).toBe(undefined);
    });
});
