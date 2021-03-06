/// <reference path="../node_modules/@types/angular/index.d.ts" />
/// <reference path="../node_modules/@types/angular-ui-router/index.d.ts" />
/// <reference path="../node_modules/@types/cordova/index.d.ts" />
/// <reference path="../node_modules/@types/ionic/index.d.ts" />

interface IService2 {
    input: string;
    output: number;
    method2(): void;
}

(function() {

    class Service2 {
        public input: string = "";
        public output: number = 0;

        public constructor(private Service1: IService1) {
        }

        public method2(): void {
            this.output = this.Service1.method1(this.input);
            console.log("Service2#method2: output = "+this.output);
        }
    }

    const app = angular.module("testapp");
    app.service("Service2",Service2);

})();
