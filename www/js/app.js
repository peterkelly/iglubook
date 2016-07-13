// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function ($stateProvider,$urlRouterProvider) {

    $stateProvider
    .state("login",{ url: "/login", templateUrl: "login.html" })
    .state("signup",{ url: "/signup", templateUrl: "signup.html" })
    .state("main",{ url: "/main", templateUrl: "main.html", controller: "MainCtrl", abstract: true })
    .state("main.feed",{
        url: "/feed",
        views: {
            "content": {
                templateUrl: "feed.html",
                controller: "FeedCtrl",
            }
        }
    })
    .state("main.comments",{
        url: "/feed/comments",
        views: {
            "content": {
                templateUrl: "comments.html",
                controller: "CommentsCtrl",
            }
        }
    })
    .state("main.profile",{
        url: "/profile",
        views: {
            "content": {
                templateUrl: "profile.html",
                controller: "ProfileCtrl",
            }
        }
    })
    .state("main.friends",{
        url: "/friends",
        views: {
            "content": {
                templateUrl: "friends.html",
                controller: "FriendsCtrl",
            }
        }
    })
    .state("main.logout",{
        url: "/logout",
        views: {
            "content": {
                templateUrl: "logout.html",
                controller: "LogoutCtrl",
            }
        }
    })

    $urlRouterProvider.otherwise("/login")
})

.service("api",function($timeout,$q,$http) {
    return {
        // getFeedContents: function() {
        //     return $q(function(resolve,reject) {
        //         $timeout(function() {
        //             resolve([
        //                 { id: 1, content: "First post" },
        //                 { id: 2, content: "Second post" },
        //                 { id: 3, content: "Third post" },
        //                 { id: 4, content: "Fourth post" },
        //                 { id: 5, content: "Fifth post" },
        //                 { id: 6, content: "Sixth post" },
        //             ]);
        //         },2000);
        //     });
        // }
        getFeedContents: function() {
            return $q(function(resolve,reject) {
                $http({
                    method: "GET",
                    url: "http://localhost:3000/posts",
                }).then(function(response) {
                    console.log("Resposne",response);
                    resolve(response.data);
                }).catch(function(error) {
                    reject(error);
                });
            });
        }
    }
})

.controller("FeedCtrl",function($scope,$ionicLoading,$timeout,api) {
    // $scope.viewTitle = "Feed";
    // console.log("feed: viewTitle = "+$scope.viewTitle);
    // $scope.viewTitle = "Known";
    // console.log("feed: viewTitle = "+$scope.viewTitle);
    $scope.viewTitle.value = "Feed";
    $scope.posts = [];

    $scope.buttonPressed = function() {
        console.log("buttonPressed");
        $ionicLoading.show({
            template: "Loading..."
        }).then(function() {
            console.log("Loading indicator now displayed");

            $timeout(function() {
                $ionicLoading.hide().then(function() {
                    console.log("Loading indicator now hidden");
                });

            },2000);
        });
    }

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
})

.controller("CommentsCtrl",function($scope) {
    // $scope.viewTitle = "Comments";
    $scope.viewTitle.value = "Comments";
})

.controller("ProfileCtrl",function($scope) {
    $scope.viewTitle.value = "Profile";
})

.controller("FriendsCtrl",function($scope) {
    $scope.viewTitle.value = "Friends";
})

.controller("LogoutCtrl",function($scope) {
    $scope.viewTitle.value = "Logout";
})

.controller("MainCtrl",function($scope,$ionicSideMenuDelegate,$state,$timeout) {
    $scope.viewTitle = { value: "Unknown!!!!" };
    $scope.toggleMenu = function() {
        $ionicSideMenuDelegate.toggleLeft();
    }
})


/*

Login
Sign up
News feed
Comments
Menu
- News feed
- Profile
- Friends
- Log out



*/
