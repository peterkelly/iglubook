/// <reference path="../node_modules/@types/angular/index.d.ts" />
/// <reference path="../node_modules/@types/angular-ui-router/index.d.ts" />
/// <reference path="../node_modules/@types/cordova/index.d.ts" />
/// <reference path="../node_modules/@types/ionic/index.d.ts" />

(function() {

    const app = angular.module("iglubook");
    app.controller("FeedController",FeedController);

    function FeedController($ionicLoading,$timeout,$state,api,$rootScope) {
        const self = this;
        self.posts = null;

        self.doRefresh = function() {
            api.getFeedContents().then(function(posts) {
                console.log("getFeedContents: success");
                self.posts = posts;
            }).catch(function(error) {
                console.log("getFeedContents: failure: "+error);
            }).finally(function() {
                self.$broadcast("scroll.refreshComplete");
            });
        }

        self.likePressed = function(post) {
            // api.likePost is an asynchronous function, but to avoid a delay in the UI, optimistically
            // assume that it will succeed, and update the like count
            post.likes++;
            api.likePost(post);
        }

        self.commentsPressed = function(post) {
            console.log("Comments pressed: "+post.id);
            $state.go("main.feed.comments");
        }

        $rootScope.feedDirty = function() {
            self.doRefresh();
        }

        self.doRefresh();
    }

})();
