/// <reference path="../node_modules/@types/angular/index.d.ts" />
/// <reference path="../node_modules/@types/angular-ui-router/index.d.ts" />
/// <reference path="../node_modules/@types/cordova/index.d.ts" />
/// <reference path="../node_modules/@types/ionic/index.d.ts" />

declare namespace fixes {
    interface IonicLoadingService {
        show(opts?: ionic.loading.IonicLoadingOptions): angular.IPromise<void>;
        hide(): angular.IPromise<void>;
    }
}
