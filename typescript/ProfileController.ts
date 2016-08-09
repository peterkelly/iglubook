/// <reference path="../node_modules/@types/angular/index.d.ts" />
/// <reference path="../node_modules/@types/angular-ui-router/index.d.ts" />
/// <reference path="../node_modules/@types/cordova/index.d.ts" />
/// <reference path="../node_modules/@types/ionic/index.d.ts" />

(function() {

    const app = angular.module("iglubook");
    app.controller("ProfileController",ProfileController);

    function ProfileController($ionicLoading,$timeout,api,countries) {
        const self = this;
        self.user = null;
        self.notifications = true;
        self.test = null;
        self.countries = countries.countries;
        self.countryNamesByCode = countries.countryNamesByCode;

        api.getUser().then(function(user) {
            self.user = user;
            self.userError = "Failed to load";
        });

        self.updatePressed = function() {
            console.log("country = "+self.user.country+", gender = "+self.user.gender);
            $ionicLoading.show({ template: "Saving changes..." }).then(function() {
                $timeout(function() {
                    $ionicLoading.hide();
                },1000);
            })
        }
    }

})();
