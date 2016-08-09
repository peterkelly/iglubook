/// <reference path="../node_modules/@types/angular/index.d.ts" />
/// <reference path="../node_modules/@types/angular-ui-router/index.d.ts" />
/// <reference path="../node_modules/@types/cordova/index.d.ts" />
/// <reference path="../node_modules/@types/ionic/index.d.ts" />

(function() {

    const app = angular.module("iglubook");
    app.controller("ProfileController",ProfileController);

    function ProfileController($scope,$ionicLoading,$timeout,api,countries) {
        $scope.user = null;
        $scope.notifications = true;
        $scope.test = null;
        $scope.countries = countries.countries;
        $scope.countryNamesByCode = countries.countryNamesByCode;

        api.getUser().then(function(user) {
            $scope.user = user;
            $scope.userError = "Failed to load";
        });

        $scope.updatePressed = function() {
            console.log("country = "+$scope.user.country+", gender = "+$scope.user.gender);
            $ionicLoading.show({ template: "Saving changes..." }).then(function() {
                $timeout(function() {
                    $ionicLoading.hide();
                },1000);
            })
        }
    }

})();
