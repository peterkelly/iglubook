/// <reference path="../node_modules/@types/angular/index.d.ts" />
/// <reference path="../node_modules/@types/angular-ui-router/index.d.ts" />
/// <reference path="../node_modules/@types/cordova/index.d.ts" />
/// <reference path="../node_modules/@types/ionic/index.d.ts" />

interface ISampleData {
    users: IUser[];
    posts: IPost[];
}

(function() {

    const users: IUser[] = [
        {
            id: 1,
            email: "demo@iglu.inet",
            firstName: "Demo",
            lastName: "User",
            gender: "M",
            country: "TH",
        },
        {
            id: 2,
            email: "jennifer@iglubook.com",
            firstName: "Jennifer",
            lastName: "Lawrence",
            gender: "F",
            country: "US",
        },
        {
            id: 3,
            email: "robert@iglubook.com",
            firstName: "Robert",
            lastName: "Downey Jr",
            gender: "M",
            country: "US",
        },
        {
            id: 4,
            email: "leo@iglubook.com",
            firstName: "Leonardo",
            lastName: "DiCaprio",
            gender: "M",
            country: "US",
        },
        {
            id: 5,
            email: "brad@iglubook.com",
            firstName: "Bradley",
            lastName: "Cooper",
            gender: "M",
            country: "US",
        },
        {
            id: 6,
            email: "the@rock.com",
            firstName: "Dwayne",
            lastName: "Johnson",
            gender: "M",
            country: "US",
        },
        {
            id: 7,
            email: "hugh@iglubook.com",
            firstName: "Hugh",
            lastName: "Jackman",
            gender: "M",
            country: "AU",
        },
        {
            id: 8,
            email: "sandra@iglubook.com",
            firstName: "Sandra",
            lastName: "Bullock",
            gender: "F",
            country: "US",
        },
        {
            id: 9,
            email: "scarlett@iglubook.com",
            firstName: "Scarlett",
            lastName: "Johansson",
            gender: "F",
            country: "US",
        },
    ];

    const posts: IPost[] = [
        {
            id: 1,
            posterId: 2,
            posterFullName: "Jennifer Lawrence",
            date: "10 July 10:14am",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam volutpat "+
            "egestas pretium. Nunc pellentesque venenatis felis sit amet ullamcorper. Phasellus arcu "+
            "lacus, placerat eu est quis, bibendum hendrerit dolor. Sed ac sem tellus. Mauris "+
            "tristique, ante ut sodales placerat, nisi ex faucibus elit, eu pretium felis mi et metus.",
            likeCount: 4,
            commentCount: 0,
        },
        {
            id: 2,
            posterId: 3,
            posterFullName: "Robert Downey Jr",
            date: "11 July 2:35pm",
            content: "Maecenas nec mi auctor, euismod ligula imperdiet, vulputate nisi. Vivamus "+
            "luctus eros et mattis faucibus. Suspendisse potenti. In hac habitasse platea dictumst. "+
            "Ut venenatis, lacus vel suscipit placerat, leo ipsum tincidunt dui, quis pellentesque "+
            "nibh justo et est.",
            likeCount: 17,
            commentCount: 5,
        },
        {
            id: 3,
            posterId: 4,
            posterFullName: "Leonardo DiCaprio",
            date: "11 July 4:20pm",
            content: "Fusce felis nisl, cursus quis malesuada sed, varius et sapien. Pellentesque "+
            "sed porta turpis. Morbi varius enim et massa tristique, et fermentum purus congue.",
            likeCount: 11,
            commentCount: 3,
        },
        {
            id: 4,
            posterId: 5,
            posterFullName: "Bradley Cooper",
            date: "11 July 5:50pm",
            content: "Etiam luctus arcu at tincidunt pellentesque. Donec eu quam risus. Cras "+
            "commodo sapien at diam gravida lobortis. Quisque ac nisl eu nisi fringilla blandit eu "+
            "ac elit. Mauris commodo eleifend mattis. Praesent volutpat fringilla dictum. Etiam "+
            "viverra ultricies dolor ut bibendum. Sed ullamcorper pretium sem nec suscipit.",
            likeCount: 0,
            commentCount: 19,
        },
        {
            id: 5,
            posterId: 6,
            posterFullName: "Dwayne Johnson",
            date: "12 July 11:20am",
            content: "Aliquam rutrum dignissim nibh. Donec in metus nec lacus sodales imperdiet. "+
            "Mauris cursus blandit magna, a accumsan felis porttitor et. Etiam a libero a ante "+
            "tincidunt fringilla id et ante. Mauris a lacus eu eros pharetra imperdiet id quis metus. "+
            "Fusce at libero dui.",
            likeCount: 6,
            commentCount: 2,
        },
        {
            id: 6,
            posterId: 7,
            posterFullName: "Hugh Jackman",
            date: "12 July 12:39pm",
            content: "Nam suscipit consequat nulla, vitae sodales magna mattis blandit. Donec "+
            "vehicula mattis quam, nec sodales tellus sagittis interdum.",
            likeCount: 10,
            commentCount: 6,
        },
        {
            id: 7,
            posterId: 8,
            posterFullName: "Sandra Bullock",
            date: "13 July 15:22pm",
            content: "Donec id augue dapibus, imperdiet purus id, condimentum augue. Cras sodales "+
            "enim magna, ut fringilla justo luctus sit amet. Ut ornare gravida porttitor. Vivamus sit "+
            "amet augue aliquet, finibus augue nec, pharetra metus. Vestibulum non nisi id lorem "+
            "maximus feugiat eget ut ex.",
            likeCount: 3,
            commentCount: 3,
        },
        {
            id: 8,
            posterId: 9,
            posterFullName: "Scarlett Johansson",
            date: "13 July 18:59pm",
            content: "Maecenas fringilla ornare consectetur. Vestibulum at laoreet augue. Duis id "+
            "fringilla massa, vitae imperdiet leo. Pellentesque eu gravida diam. Morbi venenatis "+
            "pellentesque nisl ac porta. Donec sollicitudin urna massa, ac molestie urna cursus in.",
            likeCount: 15,
            commentCount: 6,
        },
    ];

    const sampleData: ISampleData = {
        users: users,
        posts: posts
    }


    const app = angular.module("iglubook");
    app.value("SampleData",sampleData);

})();
