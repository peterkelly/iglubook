// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic']);

app.run(function($ionicPlatform) {
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
        views: {
            "content": {
                templateUrl: "feed.html",
            }
        }
    })
    .state("main.comments",{
        url: "/feed/comments",
        views: {
            "content": {
                templateUrl: "comments.html",
            }
        }
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
    .state("main.logout",{
        url: "/logout",
        views: {
            "content": {
                templateUrl: "logout.html",
            }
        }
    })

    $urlRouterProvider.otherwise("/login")
});

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
                $state.go("main.feed");
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

app.controller("FeedCtrl",function($scope,$ionicLoading,$timeout,api) {
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
    };

    $scope.doRefresh = function() {
        api.getFeedContents().then(function(posts) {
            console.log("getFeedContents: success");
            $scope.posts = posts;
        }).catch(function(error) {
            console.log("getFeedContents: failure: "+error);
        }).finally(function() {
            $scope.$broadcast("scroll.refreshComplete");
        });
    };

    $scope.doRefresh();
});

app.controller("CommentsCtrl",function($scope) {
    // $scope.viewTitle = "Comments";
    $scope.viewTitle.value = "Comments";
});

app.controller("ProfileCtrl",function($scope,$ionicLoading,$timeout,api) {
    $scope.viewTitle.value = "Profile";

    $scope.user = null;
    $scope.notifications = true;
    $scope.test = null;

    $scope.updatePressed = function() {
        $ionicLoading.show({ template: "Saving changes..." }).then(function() {
            $timeout(function() {
                $ionicLoading.hide();
            },1000);
        })
    }

    api.getUser().then(function(user) {
        $scope.user = user;
    });

});

app.controller("FriendsCtrl",function($scope,api) {
    $scope.viewTitle.value = "Friends";
    $scope.friends = null;

    api.getFriends().then(function(friends) {
        $scope.friends = friends;
    });
});

app.controller("LogoutCtrl",function($scope) {
    $scope.viewTitle.value = "Logout";
});

app.controller("MainCtrl",function($scope,$ionicSideMenuDelegate,$state,$timeout) {

    $scope.viewTitle = { value: "Unknown!!!!" };

    $scope.toggleMenu = function() {
        $ionicSideMenuDelegate.toggleLeft();
    }

    $scope.logoutPressed = function() {
        $state.go("login");
    }

    $scope.composePressed = function() {
        console.log("Compose pressed");
    }

});


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
