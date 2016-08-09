/// <reference path="../node_modules/@types/angular/index.d.ts" />
/// <reference path="../node_modules/@types/angular-ui-router/index.d.ts" />
/// <reference path="../node_modules/@types/cordova/index.d.ts" />
/// <reference path="../node_modules/@types/ionic/index.d.ts" />

(function() {

    const app = angular.module("iglubook");
    app.controller("NewPostController",NewPostController);

    function NewPostController($scope,$rootScope,$ionicLoading,$ionicHistory,api) {
        $scope.content = { text: "" };

        $scope.postPressed = function() {
            console.log("postPressed: content = "+JSON.stringify($scope.content.text));
            $ionicLoading.show().then(function() {
                api.newPost(new Date(),$scope.content.text).then(function(post) {
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
