/// <reference path="../node_modules/@types/angular/index.d.ts" />
/// <reference path="../node_modules/@types/angular-ui-router/index.d.ts" />
/// <reference path="../node_modules/@types/cordova/index.d.ts" />
/// <reference path="../node_modules/@types/ionic/index.d.ts" />

(function() {

    class MainController {
        private newPostModal: ionic.modal.IonicModalController;

        public constructor(
            private $scope: angular.IScope,
            private $state: angular.ui.IStateService,
            private $ionicSideMenuDelegate: ionic.sideMenu.IonicSideMenuDelegate,
            private $ionicPopup: ionic.popup.IonicPopupService,
            private $ionicModal: ionic.modal.IonicModalService) {

            $ionicModal.fromTemplateUrl("newpost.html",{ scope: $scope }).then((modal) => {
                console.log("Loaded new post modal");
                this.newPostModal = modal;
            }).catch((error) => {
                console.log("Failed to load new post modal: "+error);
            });
        }

        public toggleMenu() {
            this.$ionicSideMenuDelegate.toggleLeft();
        }

        public logoutPressed() {
            this.$ionicPopup.show({
                title: "Log out",
                template: "Are you sure you want to log out?",
                buttons: [
                    { text: "Cancel",
                      type: "button-positive" },
                    { text: "Log out",
                      type: "button-assertive",
                      onTap: () => this.$state.go("login") },
                ],
            });
        }

        public showNewPost() {
            // this.newPostModal.show();
            this.$state.go("main.feed.newpost");
        }

        public hideNewPost() {
            this.newPostModal.hide();
        }
    }

    const app = angular.module("iglubook");
    app.controller("MainController",MainController);

})();
