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
    getComments(post: IPost): IPromise<IComment[]>;
    addComment(post: IPost, text: string): IPromise<IComment>;
    likeComment(comment: IComment): IPromise<void>;
}

interface IUser {
    id: number;
    email: string;
    password: string;
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
    likes: number;
    comments: number;
}

interface IComment {
    commentId: number;
    postId: number;
    userId: number;
    userFullName: number,
    date: string;
    likeCount: number;
    text: string;
}

(function() {

    const fakeTimeout = 1000;

    function copyUser(user: IUser): IUser {
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

    function copyPost(post: IPost): IPost {
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
        private userId: number;

        public constructor(
            private $timeout: angular.ITimeoutService,
            private $q: angular.IQService,
            private $http: angular.IHttpService,
            private SampleData: ISampleData) {
            this.userId = SampleData.users[0].id;
        }

        public getFeedContents(): IPromise<IPost[]> {
            return this.$q<IPost[]>((resolve,reject) => {
                this.$timeout(() => resolve(copyArray(this.SampleData.posts,copyPost)),fakeTimeout);
            });
        }

        public getFriends(): IPromise<IUser[]> {
            return this.$q<IUser[]>((resolve,reject) => {
                this.$timeout(() => resolve(copyArray(this.SampleData.users,copyUser)),fakeTimeout);
            });
        }

        public getUser(): IPromise<IUser> {
            return this.$q<IUser>((resolve,reject) => {
                this.$timeout(() => resolve(copyUser(this.SampleData.users[0])),fakeTimeout);
            });
        }

        public newPost(date: Date, content: string): IPromise<IPost> {
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

            return this.$q<IPost>((resolve,reject) => {
                this.$timeout(() => resolve(copyPost(post)),fakeTimeout);
            });
        }

        public likePost(post: IPost): IPromise<IPost> {
            return this.$q<IPost>((resolve,reject) => {
                this.$timeout(() => {
                    var resultPost: IPost | null = null;
                    for (var i = 0; i < this.SampleData.posts.length; i++) {
                        if (this.SampleData.posts[i].id == post.id) {
                            this.SampleData.posts[i].likes++;
                            copyPost(this.SampleData.posts[i]);
                        }
                    }
                    if (resultPost !== null)
                        resolve(resultPost);
                    else
                        reject(new Error("Post not found"));
                },fakeTimeout);
            });
        }

        public getComments(post: IPost): IPromise<IComment[]> {
            throw new Error("getComments not implemented");
        }

        public addComment(post: IPost, text: string): IPromise<IComment> {
            throw new Error("addComment not implemented");
        }

        public likeComment(comment: IComment): IPromise<void> {
            throw new Error("likeComment not implemented");
        }

    }

    const app = angular.module("iglubook");
    app.service("APIService",APIService);

})();
