/// <reference path="../node_modules/@types/angular/index.d.ts" />
/// <reference path="../node_modules/@types/angular-ui-router/index.d.ts" />
/// <reference path="../node_modules/@types/cordova/index.d.ts" />
/// <reference path="../node_modules/@types/ionic/index.d.ts" />

(function() {

    class NewPostController {
        public content: { text: string };

        public constructor(
            private $rootScope: angular.IRootScopeService,
            private $ionicLoading: fixes.IonicLoadingService,
            private $ionicHistory: ionic.navigation.IonicHistoryService,
            private $timeout: angular.ITimeoutService,
            private APIService: IAPIService) {

            this.content = { text: "" };
        }

        public postPressed() {
            console.log("postPressed: content = "+JSON.stringify(this.content.text));
            this.$ionicLoading.show().then(() => {
                this.APIService.newPost(new Date(),this.content.text).then((post) => {
                    this.$rootScope.$emit("feed-dirty");
                    this.$ionicHistory.goBack();
                }).catch((error) => {
                    console.log("Error submitting new post: "+error);
                }).finally(() => {
                    this.$ionicLoading.hide();
                });
            });
        }
    }

    const app = angular.module("iglubook");
    app.controller("NewPostController",NewPostController);

})();
