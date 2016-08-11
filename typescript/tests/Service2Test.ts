/// <reference path="../../node_modules/@types/angular/index.d.ts" />
/// <reference path="../../node_modules/@types/angular-ui-router/index.d.ts" />
/// <reference path="../../node_modules/@types/cordova/index.d.ts" />
/// <reference path="../../node_modules/@types/ionic/index.d.ts" />
/// <reference path="../../node_modules/@types/jasmine/index.d.ts" />
/// <reference path="../../node_modules/@types/karma/index.d.ts" />

describe("Service2",() => {
    it("1 + 1 should equal 2",() => {
        expect(1+1).toBe(2);
    });
    it("1 + 1 should equal 3",() => {
        expect(1+1).toBe(3);
    });
    it("1 + 1 should still be equal 2",() => {
        expect(1+1).toBe(2);
    });
});
