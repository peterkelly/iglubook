/// <reference path="../node_modules/@types/angular/index.d.ts" />
/// <reference path="../node_modules/@types/angular-ui-router/index.d.ts" />
/// <reference path="../node_modules/@types/cordova/index.d.ts" />
/// <reference path="../node_modules/@types/ionic/index.d.ts" />

type IPromise<T> = angular.IPromise<T>;

interface IAPIService {
    getFeedContents(): IPromise<IPost[]>;
    getFriends(): IPromise<IUser[]>;
    getUser(): IPromise<IUser>;
    newPost(date: Date, content: string): IPromise<IPost>;
    likePost(post: IPost): IPromise<IPost>;
    unlikePost(post: IPost): IPromise<IPost>;
    getComments(post: IPost): IPromise<IComment[]>;
    addComment(post: IPost, date: string, content: string): IPromise<IComment>;
    likeComment(comment: IComment): IPromise<IComment>;
    unlikeComment(comment: IComment): IPromise<IComment>;
}

interface IUser {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
    country: string;
}

interface IPost {
    id: number;
    posterId: number;
    posterFullName: string;
    date: string;
    content: string;
    likeCount: number;
    commentCount: number;
}

interface IComment {
    id: number;
    postId: number;
    userId: number;
    userFullName: string;
    date: string;
    likeCount: number;
    content: string;
}

(function() {

    const fakeTimeout = 1000;

    function copyUser(user: IUser): IUser {
        return {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            gender: user.gender,
            country: user.country,
        }
    }

    function copyPost(post: IPost): IPost {
        return {
            id: post.id,
            posterId: post.posterId,
            posterFullName: post.posterFullName,
            date: post.date,
            content: post.content,
            likeCount: post.likeCount,
            commentCount: post.commentCount,
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
        private authToken: string = "1";

        public constructor(
            private $timeout: angular.ITimeoutService,
            private $q: angular.IQService,
            private $http: angular.IHttpService,
            private SampleData: ISampleData,
            private BackendService: IBackendService) {
        }

        public getFeedContents(): IPromise<IPost[]> {
            return this.BackendService.getFeedContents(this.authToken);
        }

        public getFriends(): IPromise<IUser[]> {
            return this.BackendService.getFriends(this.authToken);
        }

        public getUser(): IPromise<IUser> {
            return this.BackendService.getUser(this.authToken);
        }

        public newPost(date: Date, content: string): IPromise<IPost> {
            return this.BackendService.newPost(this.authToken,date.toString(),content);
        }

        public likePost(post: IPost): IPromise<IPost> {
            return this.BackendService.likePost(this.authToken,post.id);
        }

        public unlikePost(post: IPost): IPromise<IPost> {
            return this.BackendService.unlikePost(this.authToken,post.id);
        }

        public getComments(post: IPost): IPromise<IComment[]> {
            return this.BackendService.getComments(this.authToken,post.id);
        }

        public addComment(post: IPost, date: string, content: string): IPromise<IComment> {
            return this.BackendService.addComment(this.authToken,post.id,date,content);
        }

        public likeComment(comment: IComment): IPromise<IComment> {
            return this.BackendService.likeComment(this.authToken,comment.id);
        }

        public unlikeComment(comment: IComment): IPromise<IComment> {
            return this.BackendService.unlikeComment(this.authToken,comment.id);
        }
    }

    const app = angular.module("iglubook");
    app.service("APIService",APIService);

})();
