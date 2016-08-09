/// <reference path="../node_modules/@types/angular/index.d.ts" />
/// <reference path="../node_modules/@types/angular-ui-router/index.d.ts" />
/// <reference path="../node_modules/@types/cordova/index.d.ts" />
/// <reference path="../node_modules/@types/ionic/index.d.ts" />

(function() {

    const app = angular.module("iglubook");
    app.controller("LoginController",LoginController);

    function LoginController($scope,$state,$timeout,$ionicLoading) {
        $scope.email = "";
        $scope.password = "";

        $scope.$watch("email",function() {
            console.log("Email changed: "+JSON.stringify($scope.email));
        });

        $scope.$watch("password",function() {
            console.log("Password changed: "+JSON.stringify($scope.password));
        });

        $scope.loginPressed = function() {
            console.log("Log in pressed");
            console.log("email = "+$scope.email);
            console.log("password = "+$scope.password);
            // $state.go("main.feed");
            $ionicLoading.show().then(function() {
                $timeout(function() {
                    $ionicLoading.hide();
                    $state.go("main.feed.posts");
                },1500);
            });
        };

        $scope.signupPressed = function() {
            console.log("Sign up pressed");
            $state.go("signup");
        };
    }

})();
