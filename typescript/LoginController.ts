/// <reference path="../node_modules/@types/angular/index.d.ts" />
/// <reference path="../node_modules/@types/angular-ui-router/index.d.ts" />
/// <reference path="../node_modules/@types/cordova/index.d.ts" />
/// <reference path="../node_modules/@types/ionic/index.d.ts" />

(function() {

    class LoginController {
        public email: string = "";
        public password: string = "";
        public constructor(
            private $scope: angular.IScope,
            private $state: angular.ui.IStateService,
            private $timeout: angular.ITimeoutService,
            private $ionicLoading: fixes.IonicLoadingService) {

            $scope.$watch(() => this.email,() => this.emailChanged());
            $scope.$watch(() => this.password,() => this.passwordChanged());
        }


        public loginPressed() {
            console.log("Log in pressed");
            console.log("email = "+this.email);
            console.log("password = "+this.password);
            // $state.go("main.feed");
            this.$ionicLoading.show().then(() => {
                this.$timeout(() => {
                    this.$ionicLoading.hide();
                    this.$state.go("main.feed.posts");
                },1500);
            });
        }

        public signupPressed() {
            console.log("Sign up pressed");
            this.$state.go("signup");
        }

        public emailChanged() {
            console.log("Email changed: "+JSON.stringify(this.email));
        }

        public passwordChanged() {
            console.log("Password changed: "+JSON.stringify(this.password));
        }

    }

    const app = angular.module("iglubook");
    app.controller("LoginController",LoginController);

})();
