/// <reference path="../node_modules/@types/angular/index.d.ts" />
/// <reference path="../node_modules/@types/angular-ui-router/index.d.ts" />
/// <reference path="../node_modules/@types/cordova/index.d.ts" />
/// <reference path="../node_modules/@types/ionic/index.d.ts" />

interface IService1 {
    method1(s: string): number;
}

(function() {

    class Service1 implements IService1 {
        public constructor() {
        }

        public method1(s: string): number {
            return s.length;
        }
    }

    const app = angular.module("testapp");
    app.service("Service1",Service1);

})();
