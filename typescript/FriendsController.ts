/// <reference path="../node_modules/@types/angular/index.d.ts" />
/// <reference path="../node_modules/@types/angular-ui-router/index.d.ts" />
/// <reference path="../node_modules/@types/cordova/index.d.ts" />
/// <reference path="../node_modules/@types/ionic/index.d.ts" />

(function() {

    class FriendsController {
        private friends: IAPIUser[] | null = null;
        private countryNamesByCode: { [code: string]: string };

        public constructor(
            private APIService: IAPIService,
            private countries: ICountries) {

            this.countryNamesByCode = countries.countryNamesByCode;

            APIService.getFriends().then((friends) => {
                this.friends = friends;
            });
        }
    }

    const app = angular.module("iglubook");
    app.controller("FriendsController",FriendsController);

})();
