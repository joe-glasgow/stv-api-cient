jest.dontMock('../js/libs/stv/tdd');
import myTest from '../js/libs/stv/tdd';

var testClass = new myTest();

describe("it tests that test driven development works", () => {
    var myValue = testClass.number;
    var doubleValue = 0;

    beforeEach(() => {
        doubleValue = testClass.doubleValue(2);
    });

    it("expects that value is 2", () =>{
        expect(myValue).toBe(2);
    });
    it("expects that doubleValue is 4", () => {
        expect(doubleValue).toBe(4);
    });
});
