/// <reference path="../node_modules/@types/angular/index.d.ts" />
/// <reference path="../node_modules/@types/angular-ui-router/index.d.ts" />
/// <reference path="../node_modules/@types/cordova/index.d.ts" />
/// <reference path="../node_modules/@types/ionic/index.d.ts" />

(function() {

    const app = angular.module("iglubook");
    app.controller("LoginController",LoginController);

    function LoginController($scope,$state,$timeout,$ionicLoading) {
        const self = this;
        self.email = "";
        self.password = "";

        $scope.$watch(() => self.email,function() {
            console.log("Email changed: "+JSON.stringify(self.email));
        });

        $scope.$watch(() => self.password,function() {
            console.log("Password changed: "+JSON.stringify(self.password));
        });

        self.loginPressed = function() {
            console.log("Log in pressed");
            console.log("email = "+self.email);
            console.log("password = "+self.password);
            // $state.go("main.feed");
            $ionicLoading.show().then(function() {
                $timeout(function() {
                    $ionicLoading.hide();
                    $state.go("main.feed.posts");
                },1500);
            });
        };

        self.signupPressed = function() {
            console.log("Sign up pressed");
            $state.go("signup");
        };
    }

})();
