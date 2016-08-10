/// <reference path="../node_modules/@types/angular/index.d.ts" />
/// <reference path="../node_modules/@types/angular-ui-router/index.d.ts" />
/// <reference path="../node_modules/@types/cordova/index.d.ts" />
/// <reference path="../node_modules/@types/ionic/index.d.ts" />

(function() {

    class ProfileController {
        public user: IAPIUser | undefined = undefined;
        public userError: string | undefined = undefined;
        public notifications: boolean = true;
        public countryList: { code: string, name: string }[];
        public countryNamesByCode: { [code: string]: string };

        public constructor(
            private $ionicLoading: fixes.IonicLoadingService,
            private $timeout: angular.ITimeoutService,
            private APIService: IAPIService,
            private countries: ICountries) {

            this.countryList = countries.countries;
            this.countryNamesByCode = countries.countryNamesByCode;

            APIService.getUser().then((user) => {
                this.user = user;
                this.userError = "Failed to load";
            });
        }

        public updatePressed() {
            const country = (this.user !== undefined) ? this.user.country : "?";
            const gender = (this.user !== undefined) ? this.user.gender : "?";
            console.log("country = "+country+", gender = "+gender);
            this.$ionicLoading.show({ template: "Saving changes..." }).then(() => {
                this.$timeout(() => this.$ionicLoading.hide(),1000);
            })
        }
    }

    const app = angular.module("iglubook");
    app.controller("ProfileController",ProfileController);

})();
