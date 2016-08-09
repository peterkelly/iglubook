/// <reference path="../node_modules/@types/angular/index.d.ts" />
/// <reference path="../node_modules/@types/angular-ui-router/index.d.ts" />
/// <reference path="../node_modules/@types/cordova/index.d.ts" />
/// <reference path="../node_modules/@types/ionic/index.d.ts" />

var app = angular.module("iglubook",["ionic"]);

app.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        if (window.cordova !== undefined) {
            // FIXME: need type definition for ionic keyboard plugin
            const plugins = <any>window.cordova.plugins;
            const Keyboard = plugins.Keyboard;

            if (Keyboard !== undefined) {
                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                Keyboard.hideKeyboardAccessoryBar(true);

                // Don't remove this line unless you know what you are doing. It stops the viewport
                // from snapping when text inputs are focused. Ionic handles this internally for
                // a much nicer keyboard experience.
                Keyboard.disableScroll(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        }
    });
});

app.config(function ($stateProvider,$urlRouterProvider) {
    // Controlers are specified in the templates, since two-way data binding does not get set up
    // correctly if we specify them here for some reason
    $stateProvider
    .state("login",{
        url: "/login",
        templateUrl: "login.html",
    })
    .state("signup",{
        url: "/signup",
        templateUrl: "signup.html",
    })
    .state("main",{
        url: "/main",
        templateUrl: "main.html",
        abstract: true
    })
    .state("main.feed",{
        url: "/feed",
        abstract: true,
        views: {
            "content": {
                templateUrl: "feed.html",
            }
        }
    })
    .state("main.feed.posts",{
        url: "/posts",
        templateUrl: "feed-posts.html",
    })
    .state("main.feed.newpost",{
        url: "/newpost",
        templateUrl: "newpost.html",
    })
    .state("main.feed.comments",{
        url: "/comments",
        templateUrl: "feed-comments.html",
    })
    .state("main.profile",{
        url: "/profile",
        views: {
            "content": {
                templateUrl: "profile.html",
            }
        }
    })
    .state("main.friends",{
        url: "/friends",
        views: {
            "content": {
                templateUrl: "friends.html",
            }
        }
    })

    $urlRouterProvider.otherwise("/login")
});

app.directive("igluLoadable",function() {
    return {
        restrict: "E",
        replace: true,
        transclude: true,
        template: function(elem,attr) {
            var property = elem[0].getAttribute("property");
            return (
                "<div ng-switch="+JSON.stringify(property)+">"+
                    "<div ng-switch-when='null'>"+
                        "<div class='padding'>"+
                            "<div class='text-center'>"+
                                "<ion-spinner class='ios spinner'></ion-spinner>"+
                                "<div>Loading</div>"+
                            "</div>"+
                        "</div>"+
                    "</div>"+
                    "<div ng-switch-default>"+
                    "<div ng-transclude>"+
                "</div>");
        },
    }
})

app.controller("LoginCtrl",function($scope,$state,$timeout,$ionicLoading) {

    $scope.email = "";
    $scope.password = "";

    $scope.$watch("email",function() {
        console.log("Email changed: "+JSON.stringify($scope.email));
    });

    $scope.$watch("password",function() {
        console.log("Password changed: "+JSON.stringify($scope.password));
    });

    $scope.loginPressed = function() {
        console.log("Log in pressed");
        console.log("email = "+$scope.email);
        console.log("password = "+$scope.password);
        // $state.go("main.feed");
        $ionicLoading.show().then(function() {
            $timeout(function() {
                $ionicLoading.hide();
                $state.go("main.feed.posts");
            },1500);
        });
    };

    $scope.signupPressed = function() {
        console.log("Sign up pressed");
        $state.go("signup");
    };

});

app.controller("SignupCtrl",function($scope) {

});

app.controller("FeedCtrl",function($scope,$ionicLoading,$timeout,$state,api,$rootScope) {
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
});

app.controller("CommentsCtrl",function($scope) {
});

app.controller("ProfileCtrl",function($scope,$ionicLoading,$timeout,api,countries) {

    $scope.user = null;
    $scope.notifications = true;
    $scope.test = null;
    $scope.countries = countries.countries;
    $scope.countryNamesByCode = countries.countryNamesByCode;

    api.getUser().then(function(user) {
        $scope.user = user;
        $scope.userError = "Failed to load";
    });

    $scope.updatePressed = function() {
        console.log("country = "+$scope.user.country+", gender = "+$scope.user.gender);
        $ionicLoading.show({ template: "Saving changes..." }).then(function() {
            $timeout(function() {
                $ionicLoading.hide();
            },1000);
        })
    }

});

app.controller("NewPostCtrl",function($scope,$rootScope,$ionicLoading,$ionicHistory,api) {

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

});

app.controller("FriendsCtrl",function($scope,api,countries) {
    $scope.friends = null;
    $scope.countryNamesByCode = countries.countryNamesByCode;

    api.getFriends().then(function(friends) {
        $scope.friends = friends;
    });

});

app.controller("MainCtrl",function($scope,$state,$ionicSideMenuDelegate,$ionicPopup,$ionicModal) {

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

});
