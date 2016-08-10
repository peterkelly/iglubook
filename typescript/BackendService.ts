/// <reference path="../node_modules/@types/angular/index.d.ts" />
/// <reference path="../node_modules/@types/angular-ui-router/index.d.ts" />
/// <reference path="../node_modules/@types/cordova/index.d.ts" />
/// <reference path="../node_modules/@types/ionic/index.d.ts" />

interface IBackendService {
    getFeedContents(authToken: string): IPromise<IPost[]>;
    getFriends(authToken: string): IPromise<IUser[]>;
    getUser(authToken: string): IPromise<IUser>;
    newPost(authToken: string, date: string, content: string): IPromise<IPost>;
    likePost(authToken: string, postId: number): IPromise<IPost>;
    unlikePost(authToken: string, postId: number): IPromise<IPost>;
    getComments(authToken: string, postId: number): IPromise<IComment[]>;
    addComment(authToken: string, postId: number, date: string, content: string): IPromise<IComment>;
    likeComment(authToken: string, commentId: number): IPromise<IComment>;
    unlikeComment(authToken: string, commentId: number): IPromise<IComment>;
}

(function() {

    interface UserData {
        email: string;
        password: string;
        firstName: string;
        lastName: string;
        gender: string;
        country: string;
    }

    class UserImpl {
        public friends: UserImpl[] = [];
        public posts: PostImpl[] = [];
        public id: number;
        public data: UserData;

        public constructor(id: number, data: UserData) {
            this.id = id;
            this.data = data;
        }

        public toJSON(): IUser {
            return {
                id: this.id,
                email: this.data.email,
                firstName: this.data.firstName,
                lastName: this.data.lastName,
                gender: this.data.gender,
                country: this.data.country,
            };
        }
    }

    interface PostData {
        user: UserImpl;
        date: string;
        content: string;
    }

    class PostImpl {
        public likedByUsers: UserImpl[] = [];
        public comments: CommentImpl[] = [];
        public id: number;
        public data: PostData;

        public constructor(id: number, data: PostData) {
            this.id = id;
            this.data = data;
        }

        public toJSON(): IPost {
            const user = this.data.user;
            return {
                id: this.id,
                posterId: user.id,
                posterFullName: user.data.firstName+" "+user.data.lastName,
                date: this.data.date,
                content: this.data.content,
                likeCount: this.likedByUsers.length,
                commentCount: this.comments.length,
            };
        }
    }

    interface CommentData {
        user: UserImpl;
        post: PostImpl;
        date: string;
        content: string;
    }

    class CommentImpl {
        public likedByUsers: UserImpl[] = [];
        public id: number;
        public data: CommentData;

        public constructor(id: number, data: CommentData) {
            this.id = id;
            this.data = data;
        }

        public toJSON(): IComment {
            const user = this.data.user;
            return {
                id: this.id,
                postId: this.data.post.id,
                userId: user.id,
                userFullName: user.data.firstName+" "+user.data.lastName,
                date: this.data.date,
                likeCount: this.likedByUsers.length,
                content: this.data.content,
            }
        }
    }

    class Backend {
        public usersById: { [id: number]: UserImpl | undefined } = { };
        public postsById: { [id: number]: PostImpl | undefined } = { };
        public commentsById: { [id: number]: CommentImpl | undefined } = { };
        private nextUserId: number = 1;
        private nextPostId: number = 1;
        private nextCommentId: number = 1;

        public createUser(data: UserData): UserImpl {
            const id = this.nextUserId++;
            const user = new UserImpl(id,data);
            this.usersById[id] = user;
            return user;
        }

        public createPost(data: PostData): PostImpl {
            const id = this.nextPostId++;
            const post = new PostImpl(id,data);
            const user = data.user;
            user.posts.push(post);
            return post;
        }

        public createComment(data: CommentData): CommentImpl {
            const id = this.nextCommentId;
            const comment = new CommentImpl(id,data);
            const post = data.post;
            post.comments.push(comment);
            return comment;
        }
    }

    class BackendService implements IBackendService {
        private backend = new Backend();
        private fakeTimeout = 1000;

        public constructor(
            private $timeout: angular.ITimeoutService,
            private $q: angular.IQService,
            private SampleData: ISampleData
        ) {
            // Load sample data
            for (const user of this.SampleData.users) {
                this.backend.createUser({
                    email: user.email,
                    password: "",
                    firstName: user.firstName,
                    lastName: user.lastName,
                    gender: user.gender,
                    country: user.country,
                });
            }
            for (const post of this.SampleData.posts) {
                const user = this.backend.usersById[post.posterId];
                if (user === undefined)
                    throw new Error("No such user: "+post.posterId);
                this.backend.createPost({
                    user: user,
                    date: post.date,
                    content: post.content,
                });
            }

            // Make every user every other users's friend for now
            for (const firstId in this.backend.usersById) {
                const firstUser = this.backend.usersById[firstId];
                for (const secondId in this.backend.usersById) {
                    const secondUser = this.backend.usersById[secondId];
                    if ((firstUser !== undefined) && (secondUser !== undefined)) {
                        // will always be the case - just need these for type guards
                        firstUser.friends.push(secondUser);
                    }
                }
            }
        }

        private userFromAuthToken(authToken: string): UserImpl | undefined {
            const userId = parseInt(authToken);
            if (isNaN(userId))
                return undefined;
            return this.backend.usersById[userId];
        }

        private canUserAccessPost(user: UserImpl, post: PostImpl): boolean {
            // A user can only see and comment on a post if it was made by one of their friends
            for (const friend of user.friends) {
                if (post.data.user === friend)
                    return true;
            }
            return false;
        }

        private delay(fun: () => void): void {
            this.$timeout(fun,this.fakeTimeout);
        }

        public getFeedContents(authToken: string): IPromise<IPost[]> {
            return this.$q<IPost[]>((resolve,reject) => {
                this.delay(() => {
                    const user = this.userFromAuthToken(authToken);
                    if (user === undefined) {
                        reject("Invalid authentication token");
                    }
                    else {
                        const posts: IPost[] = [];
                        for (const friend of user.friends) {
                            for (const friendPost of friend.posts)
                                posts.push(friendPost.toJSON());
                        }
                        resolve(posts);
                    }
                });
            });
        }

        public getFriends(authToken: string): IPromise<IUser[]> {
            return this.$q<IUser[]>((resolve,reject) => {
                this.delay(() => {
                    const user = this.userFromAuthToken(authToken);
                    if (user === undefined) {
                        reject("Invalid authentication token");
                    }
                    else {
                        const result: IUser[] = [];
                        for (const friend of user.friends)
                            result.push(friend.toJSON());
                        resolve(result);
                    }
                });
            });
        }

        public getUser(authToken: string): IPromise<IUser> {
            return this.$q<IUser>((resolve,reject) => {
                this.delay(() => {
                    const user = this.userFromAuthToken(authToken);
                    if (user === undefined) {
                        reject("Invalid authentication token");
                    }
                    else {
                        resolve(user.toJSON());
                    }
                });
            });
        }

        public newPost(authToken: string, date: string, content: string): IPromise<IPost> {
            return this.$q<IPost>((resolve,reject) => {
                this.delay(() => {
                    const user = this.userFromAuthToken(authToken);
                    if (user === undefined) {
                        reject("Invalid authentication token");
                    }
                    else {
                        const post = this.backend.createPost({
                            user: user,
                            date: date,
                            content: content,
                        });
                        resolve(post.toJSON());
                    }
                });
            });
        }

        public likePost(authToken: string, postId: number): IPromise<IPost> {
            return this.$q<IPost>((resolve,reject) => {
                this.delay(() => {
                    const user = this.userFromAuthToken(authToken);
                    if (user === undefined) {
                        reject("Invalid authentication token");
                        return;
                    }

                    const post = this.backend.postsById[postId];
                    if (post === undefined) {
                        reject("No such post");
                        return;
                    }

                    const index = post.likedByUsers.indexOf(user);
                    if (index >= 0) {
                        reject("You already like this post");
                        return;
                    }

                    post.likedByUsers.push(user);

                    resolve(post.toJSON());
                });
            });
        }

        public unlikePost(authToken: string, postId: number): IPromise<IPost> {
            return this.$q<IPost>((resolve,reject) => {
                this.delay(() => {
                    const user = this.userFromAuthToken(authToken);
                    if (user === undefined) {
                        reject("Invalid authentication token");
                        return;
                    }

                    const post = this.backend.postsById[postId];
                    if (post === undefined) {
                        reject("No such post");
                        return;
                    }

                    const index = post.likedByUsers.indexOf(user);
                    if (index >= 0) {
                        reject("You do not already like this post");
                        return;
                    }

                    post.likedByUsers.splice(index,1);

                    resolve(post.toJSON());
                });
            });
        }

        public getComments(authToken: string, postId: number): IPromise<IComment[]> {
            return this.$q<IComment[]>((resolve,reject) => {
                this.delay(() => {
                    const user = this.userFromAuthToken(authToken);
                    if (user === undefined) {
                        reject("Invalid authentication token");
                        return;
                    }

                    const post = this.backend.postsById[postId];
                    if (post === undefined) {
                        reject("No such post");
                        return;
                    }

                    const result: IComment[] = [];
                    for (const comment of post.comments)
                        result.push(comment.toJSON());
                    resolve(result);
                });
            });
        }

        public addComment(authToken: string, postId: number, date: string, content: string): IPromise<IComment> {
            return this.$q<IComment>((resolve,reject) => {
                this.delay(() => {
                    const user = this.userFromAuthToken(authToken);
                    if (user === undefined) {
                        reject("Invalid authentication token");
                        return;
                    }

                    const post = this.backend.postsById[postId];
                    if (post === undefined) {
                        reject("No such post");
                        return;
                    }

                    const comment = this.backend.createComment({
                        user: user,
                        post: post,
                        date: date,
                        content: content,
                    });

                    post.comments.push(comment);

                    resolve(comment.toJSON());
                });
            });
        }

        public likeComment(authToken: string, commentId: number): IPromise<IComment> {
            return this.$q<IComment>((resolve,reject) => {
                this.delay(() => {
                    const user = this.userFromAuthToken(authToken);
                    if (user === undefined) {
                        reject("Invalid authentication token");
                        return;
                    }

                    const comment = this.backend.commentsById[commentId];
                    if (comment === undefined) {
                        reject("No such comment");
                        return;
                    }

                    const index = comment.likedByUsers.indexOf(user);
                    if (index >= 0) {
                        reject("You already like this comment");
                        return;
                    }

                    comment.likedByUsers.push(user);

                    resolve(comment.toJSON());
                });
            });
        }

        public unlikeComment(authToken: string, commentId: number): IPromise<IComment> {
            return this.$q<IComment>((resolve,reject) => {
                this.delay(() => {
                    const user = this.userFromAuthToken(authToken);
                    if (user === undefined) {
                        reject("Invalid authentication token");
                        return;
                    }

                    const comment = this.backend.commentsById[commentId];
                    if (comment === undefined) {
                        reject("No such comment");
                        return;
                    }

                    const index = comment.likedByUsers.indexOf(user);
                    if (index >= 0) {
                        reject("You do not already like this comment");
                        return;
                    }

                    comment.likedByUsers.splice(index,1);

                    resolve(comment.toJSON());
                });
            });
        }
    }

    const app = angular.module("iglubook");
    app.service("BackendService",BackendService);

})();
