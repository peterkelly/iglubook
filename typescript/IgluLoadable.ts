/// <reference path="../node_modules/@types/angular/index.d.ts" />
/// <reference path="../node_modules/@types/angular-ui-router/index.d.ts" />
/// <reference path="../node_modules/@types/cordova/index.d.ts" />
/// <reference path="../node_modules/@types/ionic/index.d.ts" />

(function() {

    const app = angular.module("iglubook");
    app.directive("igluLoadable",IgluLoadable)

    function IgluLoadable() {
        return {
            restrict: "E",
            replace: true,
            transclude: true,
            template: function(elem,attr) {
                var property = elem[0].getAttribute("property");
                return (
                    "<div ng-switch="+JSON.stringify(property)+">"+
                        "<div ng-switch-when='null'>"+
                            "<div class='padding'>"+
                                "<div class='text-center'>"+
                                    "<ion-spinner class='ios spinner'></ion-spinner>"+
                                    "<div>Loading</div>"+
                                "</div>"+
                            "</div>"+
                        "</div>"+
                        "<div ng-switch-default>"+
                        "<div ng-transclude>"+
                    "</div>");
            },
        }
    }

})();
