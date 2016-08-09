/// <reference path="../node_modules/@types/angular/index.d.ts" />
/// <reference path="../node_modules/@types/angular-ui-router/index.d.ts" />
/// <reference path="../node_modules/@types/cordova/index.d.ts" />
/// <reference path="../node_modules/@types/ionic/index.d.ts" />

(function() {

    const app = angular.module("iglubook");
    app.controller("NewPostController",NewPostController);

    function NewPostController(
        $rootScope: angular.IRootScopeService,
        $ionicLoading: fixes.IonicLoadingService,
        $ionicHistory: ionic.navigation.IonicHistoryService,
        $timeout: angular.ITimeoutService,
        APIService: IAPIService) {

        const self = this;

        self.content = { text: "" };
        self.postPressed = postPressed;

        function postPressed() {
            console.log("postPressed: content = "+JSON.stringify(self.content.text));
            $ionicLoading.show().then(() => {
                APIService.newPost(new Date(),self.content.text).then((post) => {
                    // FIXME: This isn't a clean way to do it; broadcast an event instead
                    (<any>$rootScope).feedDirty();
                    $ionicHistory.goBack();
                }).catch((error) => {
                    console.log("Error submitting new post: "+error);
                }).finally(() => {
                    $ionicLoading.hide();
                });
            });
        }
    }

})();
