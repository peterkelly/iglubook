/// <reference path="../node_modules/@types/angular/index.d.ts" />
/// <reference path="../node_modules/@types/angular-ui-router/index.d.ts" />
/// <reference path="../node_modules/@types/cordova/index.d.ts" />
/// <reference path="../node_modules/@types/ionic/index.d.ts" />

(function() {

    class FeedController {
        private posts: IPost[] | null = null;

        public constructor(
            private $scope: angular.IScope,
            private $ionicLoading: ionic.loading.IonicLoadingService,
            private $timeout: angular.ITimeoutService,
            private $state: angular.ui.IStateService,
            private APIService: IAPIService,
            private $rootScope: angular.IRootScopeService) {

            $rootScope.$on("feed-dirty",() => this.feedDirty());
            this.doRefresh();
        }

        public doRefresh() {
            this.APIService.getFeedContents().then((posts) => {
                console.log("getFeedContents: success");
                this.posts = posts;
            }).catch((error) => {
                console.log("getFeedContents: failure: "+error);
            }).finally(() => {
                this.$scope.$broadcast("scroll.refreshComplete");
            });
        }

        public likePressed(post: IPost) {
            // APIService.likePost is an asynchronous function, but to avoid a delay in the UI, optimistically
            // assume that it will succeed, and update the like count
            post.likes++;
            this.APIService.likePost(post);
        }

        public commentsPressed(post: IPost) {
            console.log("Comments pressed: "+post.id);
            this.$state.go("main.feed.comments");
        }

        public feedDirty() {
            this.doRefresh();
        }
    }

    const app = angular.module("iglubook");
    app.controller("FeedController",FeedController);

})();
