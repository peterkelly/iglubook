/// <reference path="../node_modules/@types/angular/index.d.ts" />
/// <reference path="../node_modules/@types/angular-ui-router/index.d.ts" />
/// <reference path="../node_modules/@types/cordova/index.d.ts" />
/// <reference path="../node_modules/@types/ionic/index.d.ts" />

(function() {

    const app = angular.module("iglubook");
    app.controller("FeedController",FeedController);

    function FeedController($scope,$ionicLoading,$timeout,$state,api,$rootScope) {
        $scope.posts = null;

        $scope.doRefresh = function() {
            api.getFeedContents().then(function(posts) {
                console.log("getFeedContents: success");
                $scope.posts = posts;
            }).catch(function(error) {
                console.log("getFeedContents: failure: "+error);
            }).finally(function() {
                $scope.$broadcast("scroll.refreshComplete");
            });
        }

        $scope.likePressed = function(post) {
            // api.likePost is an asynchronous function, but to avoid a delay in the UI, optimistically
            // assume that it will succeed, and update the like count
            post.likes++;
            api.likePost(post);
        }

        $scope.commentsPressed = function(post) {
            console.log("Comments pressed: "+post.id);
            $state.go("main.feed.comments");
        }

        $rootScope.feedDirty = function() {
            $scope.doRefresh();
        }

        $scope.doRefresh();
    }

})();
