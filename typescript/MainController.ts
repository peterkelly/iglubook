/// <reference path="../node_modules/@types/angular/index.d.ts" />
/// <reference path="../node_modules/@types/angular-ui-router/index.d.ts" />
/// <reference path="../node_modules/@types/cordova/index.d.ts" />
/// <reference path="../node_modules/@types/ionic/index.d.ts" />

(function() {

    const app = angular.module("iglubook");
    app.controller("MainController",MainController);

    function MainController($scope,$state,$ionicSideMenuDelegate,$ionicPopup,$ionicModal) {
        const self = this;

        self.newPostModal = null;
        self.toggleMenu = toggleMenu;
        self.logoutPressed = logoutPressed;
        self.showNewPost = showNewPost;
        self.hideNewPost = hideNewPost;

        $ionicModal.fromTemplateUrl("newpost.html",{ scope: $scope }).then(function(modal) {
            console.log("Loaded new post modal");
            self.newPostModal = modal;
        }).catch(function(error) {
            console.log("Failed to load new post modal: "+error);
        });

        function toggleMenu() {
            $ionicSideMenuDelegate.toggleLeft();
        }

        function logoutPressed() {
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

        function showNewPost() {
            // self.newPostModal.show();
            $state.go("main.feed.newpost");
        }

        function hideNewPost() {
            self.newPostModal.hide();
        }
    }

})();
