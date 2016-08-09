/// <reference path="../node_modules/@types/angular/index.d.ts" />
/// <reference path="../node_modules/@types/angular-ui-router/index.d.ts" />
/// <reference path="../node_modules/@types/cordova/index.d.ts" />
/// <reference path="../node_modules/@types/ionic/index.d.ts" />

(function() {

    const app = angular.module("iglubook");
    app.controller("MainController",MainController);

    function MainController($scope,$state,$ionicSideMenuDelegate,$ionicPopup,$ionicModal) {
        $scope.newPostModal = null;
        $ionicModal.fromTemplateUrl("newpost.html",{ scope: $scope }).then(function(modal) {
            console.log("Loaded new post modal");
            $scope.newPostModal = modal;
        }).catch(function(error) {
            console.log("Failed to load new post modal: "+error);
        });

        $scope.toggleMenu = function() {
            $ionicSideMenuDelegate.toggleLeft();
        }

        $scope.logoutPressed = function() {
            $ionicPopup.show({
                title: "Log out",
                template: "Are you sure you want to log out?",
                buttons: [
                    { text: "Cancel",
                      type: "button-positive" },
                    { text: "Log out",
                      type: "button-assertive",
                      onTap: function() { $state.go("login"); } },
                ],
            });
        }

        $scope.showNewPost = function() {
            // $scope.newPostModal.show();
            $state.go("main.feed.newpost");
        }

        $scope.hideNewPost = function() {
            $scope.newPostModal.hide();
        }
    }

})();
