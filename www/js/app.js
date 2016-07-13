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

.controller("FeedCtrl",function($scope) {
})

.controller("CommentsCtrl",function($scope) {
})

.controller("ProfileCtrl",function($scope) {
})

.controller("FriendsCtrl",function($scope) {
})

.controller("LogoutCtrl",function($scope) {
})

.controller("MainCtrl",function($scope,$ionicSideMenuDelegate,$state,$timeout) {
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
