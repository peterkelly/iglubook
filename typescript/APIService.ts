/// <reference path="../node_modules/@types/angular/index.d.ts" />
/// <reference path="../node_modules/@types/angular-ui-router/index.d.ts" />
/// <reference path="../node_modules/@types/cordova/index.d.ts" />
/// <reference path="../node_modules/@types/ionic/index.d.ts" />

type IPromise<T> = angular.IPromise<T>;

interface IAPIService {
    getFeedContents(): IPromise<IAPIPost[]>;
    getFriends(): IPromise<IAPIUser[]>;
    getUser(): IPromise<IAPIUser>;
    newPost(date: Date, content: string): IPromise<IAPIPost>;
    likePost(post: IAPIPost): IPromise<IAPIPost>;
}

interface IAPIUser {
    id: number,
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    gender: string,
    country: string,
}

interface IAPIPost {
    id: number,
    posterId: number,
    posterFullName: string,
    date: string,
    content: string,
    likes: number,
    comments: number,
}

(function() {

    const fakeTimeout = 1000;

    function copyUser(user: IAPIUser): IAPIUser {
        return {
            id: user.id,
            email: user.email,
            password: user.password,
            firstName: user.firstName,
            lastName: user.lastName,
            gender: user.gender,
            country: user.country,
        }
    }

    function copyPost(post: IAPIPost): IAPIPost {
        return {
            id: post.id,
            posterId: post.posterId,
            posterFullName: post.posterFullName,
            date: post.date,
            content: post.content,
            likes: post.likes,
            comments: post.comments,
        }
    }

    function copyArray<T>(array: T[], copyFun: (obj: T) => T): T[] {
        const result: T[] = [];
        for (const element of array)
            result.push(copyFun(element));
        return result;
    }

    class APIService implements IAPIService {
        private nextPostId: number = 10;

        public constructor(
            private $timeout: angular.ITimeoutService,
            private $q: angular.IQService,
            private $http: angular.IHttpService,
            private SampleData: ISampleData) {
        }

        public getFeedContents(): IPromise<IAPIPost[]> {
            return this.$q<IAPIPost[]>((resolve,reject) => {
                this.$timeout(() => resolve(copyArray(this.SampleData.posts,copyPost)),fakeTimeout);
            });
        }

        public getFriends(): IPromise<IAPIUser[]> {
            return this.$q<IAPIUser[]>((resolve,reject) => {
                this.$timeout(() => resolve(copyArray(this.SampleData.users,copyUser)),fakeTimeout);
            });
        }

        public getUser(): IPromise<IAPIUser> {
            return this.$q<IAPIUser>((resolve,reject) => {
                this.$timeout(() => resolve(copyUser(this.SampleData.users[0])),fakeTimeout);
            });
        }

        public newPost(date: Date, content: string): IPromise<IAPIPost> {
            var postId = this.nextPostId++;
            var post = {
                id: postId,
                posterId: this.SampleData.users[0].id,
                posterFullName: this.SampleData.users[0].firstName+" "+this.SampleData.users[0].lastName,
                date: date.toString(),
                content: content,
                likes: 0,
                comments: 0,
            };
            this.SampleData.posts.splice(0,0,post);

            return this.$q<IAPIPost>((resolve,reject) => {
                this.$timeout(() => resolve(copyPost(post)),fakeTimeout);
            });
        }

        public likePost(post: IAPIPost): IPromise<IAPIPost> {
            return this.$q<IAPIPost>((resolve,reject) => {
                this.$timeout(() => {
                    var resultPost: IAPIPost = null;
                    for (var i = 0; i < this.SampleData.posts.length; i++) {
                        if (this.SampleData.posts[i].id == post.id) {
                            this.SampleData.posts[i].likes++;
                            resultPost = copyPost(this.SampleData.posts[i]);
                        }
                    }
                    resolve(resultPost);
                },fakeTimeout);
            });
        }
    }

    const app = angular.module("iglubook");
    app.service("APIService",APIService);

})();
