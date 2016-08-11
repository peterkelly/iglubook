/// <reference path="../../node_modules/@types/angular/index.d.ts" />
/// <reference path="../../node_modules/@types/angular-mocks/index.d.ts" />
/// <reference path="../../node_modules/@types/angular-ui-router/index.d.ts" />
/// <reference path="../../node_modules/@types/cordova/index.d.ts" />
/// <reference path="../../node_modules/@types/ionic/index.d.ts" />
/// <reference path="../../node_modules/@types/jasmine/index.d.ts" />
/// <reference path="../../node_modules/@types/karma/index.d.ts" />

describe("Service1",function() {

    var Service1: IService1;

    beforeEach(angular.mock.module("testapp"));
    beforeEach(inject(function(_Service1_: IService1) {
        Service1 = _Service1_;
    }));

    it("1 + 1 should equal 2",() => {
        expect(1+1).toBe(2);
    });
    it("1 + 1 should equal 3",() => {
        expect(1+1).toBe(3);
    });
    it("1 + 1 should still be equal 2",function() {
        expect(1+1).toBe(2);
    });

    it("method1 should return the length of the supplied string",function() {
        expect(Service1).toBeDefined();
        expect(Service1.method1("hello")).toBe(5);
    });
});

describe("Service2",function() {

    var Service2: IService2;

    beforeEach(angular.mock.module("testapp"));
    beforeEach(inject(function(_Service2_: IService2) {
        Service2 = _Service2_;
    }));

    it("method2 should work",function() {
        expect(Service2).toBeDefined();
        Service2.input = "hello";
        Service2.method2();
        expect(Service2.output).toBe(5);
    });

});
