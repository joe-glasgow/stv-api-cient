jest.dontMock('../js/libs/stv/stv-api-builder');

var buildAPI = require('../js/libs/stv/stv-api-builder'),
    test = new buildAPI(),
    playerAPI,
    stvAPI;

describe('It tests API string', () => {
    const expectedPlayer = 'http://player.api.stv.jmor/v1/';
    const expectedSTV = 'http://api.stv.jmor/';
    beforeEach(function(){
        playerAPI = test.playerAPI();
        stvAPI = test.stvAPI();
    });
    it('checks the API string against expected output', function(){
        expect(playerAPI).toBe(expectedPlayer);
    });
    it('checks the API string against expected output', function(){
        expect(stvAPI).toBe(expectedSTV);
    });
});
