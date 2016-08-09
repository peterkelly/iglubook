/// <reference path="../node_modules/@types/angular/index.d.ts" />
/// <reference path="../node_modules/@types/angular-ui-router/index.d.ts" />
/// <reference path="../node_modules/@types/cordova/index.d.ts" />
/// <reference path="../node_modules/@types/ionic/index.d.ts" />

(function() {

    const app = angular.module("iglubook");
    app.controller("FriendsController",FriendsController);

    function FriendsController($scope,api,countries) {
        $scope.friends = null;
        $scope.countryNamesByCode = countries.countryNamesByCode;

        api.getFriends().then(function(friends) {
            $scope.friends = friends;
        });
    }

})();
