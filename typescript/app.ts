/// <reference path="../node_modules/@types/angular/index.d.ts" />
/// <reference path="../node_modules/@types/angular-ui-router/index.d.ts" />
/// <reference path="../node_modules/@types/cordova/index.d.ts" />
/// <reference path="../node_modules/@types/ionic/index.d.ts" />

(function() {

    const app = angular.module("iglubook",["ionic"]);

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

})();
