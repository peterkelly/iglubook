/// <reference path="../node_modules/@types/angular/index.d.ts" />
/// <reference path="../node_modules/@types/angular-ui-router/index.d.ts" />
/// <reference path="../node_modules/@types/cordova/index.d.ts" />
/// <reference path="../node_modules/@types/ionic/index.d.ts" />

(function() {

    const app = angular.module("iglubook");
    app.controller("NewPostController",NewPostController);

    function NewPostController($rootScope,$ionicLoading,$ionicHistory,APIService) {
        const self = this;

        self.content = { text: "" };
        self.postPressed = postPressed;

        function postPressed() {
            console.log("postPressed: content = "+JSON.stringify(self.content.text));
            $ionicLoading.show().then(function() {
                APIService.newPost(new Date(),self.content.text).then(function(post) {
                    $rootScope.feedDirty();
                    $ionicHistory.goBack();
                }).catch(function(error) {
                    console.log("Error submitting new post: "+error);
                }).finally(function() {
                    $ionicLoading.hide();
                });
            });
        }
    }

})();
